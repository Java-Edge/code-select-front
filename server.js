const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const port = Number(process.env.PORT || 8082);
const root = path.join(__dirname, 'dist');
const apiTarget = new URL(process.env.API_TARGET || 'http://127.0.0.1:8088');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const compressibleTypes = new Set([
  'text/html; charset=utf-8',
  'application/javascript; charset=utf-8',
  'text/css; charset=utf-8',
  'application/json; charset=utf-8',
  'image/svg+xml'
]);

const sendFile = (request, response, filePath, cacheControl) => {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not Found');
      return;
    }
    const headers = {
      'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Content-Length': stats.size
    };
    if (cacheControl) {
      headers['Cache-Control'] = cacheControl;
    }
    const acceptsGzip = /\bgzip\b/.test(request.headers['accept-encoding'] || '');
    if (acceptsGzip && compressibleTypes.has(headers['Content-Type']) && stats.size > 1024) {
      headers['Content-Encoding'] = 'gzip';
      headers['Vary'] = 'Accept-Encoding';
      delete headers['Content-Length'];
      const stream = fs.createReadStream(filePath).pipe(zlib.createGzip({ level: 6 }));
      response.writeHead(200, headers);
      stream.pipe(response);
      return;
    }
    response.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(response);
  });
};

const proxyApi = (request, response) => {
  const incomingUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const upstreamPath = incomingUrl.pathname.replace(/^\/api\/back(?=\/|$)/, '');
  const target = new URL(upstreamPath + incomingUrl.search, apiTarget);
  const headers = { ...request.headers, host: apiTarget.host };
  delete headers['accept-encoding'];
  const proxyRequest = http.request(
    target,
    { method: request.method, headers },
    proxyResponse => {
      const responseHeaders = { ...proxyResponse.headers };
      delete responseHeaders['transfer-encoding'];
      response.writeHead(proxyResponse.statusCode || 502, responseHeaders);
      proxyResponse.pipe(response);
    }
  );
  proxyRequest.on('error', error => {
    if (response.headersSent || response.writableEnded) {
      response.end();
      return;
    }
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ code: -1, message: 'backend unavailable', result: null }));
  });
  request.pipe(proxyRequest);
};

http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (requestUrl.pathname.startsWith('/api/')) {
    proxyApi(request, response);
    return;
  }

  const decodedPath = decodeURIComponent(requestUrl.pathname);
  const targetPath = path.join(root, decodedPath);
  if (!targetPath.startsWith(root)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }
  if (decodedPath.startsWith('/static/')) {
    sendFile(request, response, targetPath, 'public, max-age=31536000, immutable');
    return;
  }
  fs.stat(targetPath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(request, response, targetPath, 'no-cache');
      return;
    }
    sendFile(request, response, path.join(root, 'index.html'), 'no-cache');
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Code Select production server on http://127.0.0.1:${port}`);
});
