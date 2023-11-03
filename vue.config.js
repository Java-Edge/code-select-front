const path = require('path'); // 先引入path模块
module.exports = {
  lintOnSave: false,
  publicPath: './',
  assetsDir: 'static',
  parallel: false,
  devServer: {
    client: {
      overlay: false
    },
    // 需要配置允许的域名访问
    allowedHosts: "all",
    proxy: {
      "/api/back": {
        // 服务器部署时访问打开&&本地不建数据库的打开
        // target: "http://47.99.69.109:8088/",

        // 本地开发调试打开
        target: "http://localhost:8088/",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite:{
          '^/api/back': '/'
        }
      }
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
      	// 将 ../../assets/img/1.png  转化为 @/1.png
      	// 将 ../../style/test/1.scss 转化为 @/1.scss
        '@': path.join(__dirname, 'src'),
        '@s': path.join(__dirname, 'src/css'),
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require("postcss-plugin-px2rem")({
              rootValue: 16, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
              minPixelValue: 3, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
            }),
          ],
        },
      },
    },
  },
};