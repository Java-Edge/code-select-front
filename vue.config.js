const path = require('path');
module.exports = {
  // 启用 ESLint（此前 false 使 lint 形同虚设）；设为 'warning' 仅告警不阻断构建，
  // 另建议后续将 eslint 7(EOL) 升级到 8 以匹配 @vue/cli-plugin-eslint peer。
  lintOnSave: 'warning',
  publicPath: './',
  assetsDir: 'static',
  parallel: false,
  // 生产构建不生成 sourcemap，避免完整源码随产物泄露（此前未设置，Vue CLI 默认 true，发 8 个 .map）
  productionSourceMap: false,
  devServer: {
    client: {
      overlay: false
    },
    // 需要配置允许的域名访问
    allowedHosts: "all",
    historyApiFallback: true,
    proxy: {
      "/api/back": {
        // 服务器部署时访问打开&&本地不建数据库的打开
        // target: "http://远程主机:8088/",

        // 本地开发调试打开
        // 现在为内网穿透模式部署，也只用该target
        target: "http://localhost:8088/",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite:{
          '^/api/back': '/'
        }
      },
      "/api/user": {
        // 用户相关接口代理
        target: "http://localhost:8088/",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite:{
          '^/api/user': '/user'
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
        // 已删除 '@s' -> src/css 别名：src/css 目录不存在且全项目零引用（P2 配置瑕疵收口）
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
  chainWebpack: config => {
    // 生产环境剥离 console.*（含 Login.vue 验证码 URL 明文打印、axios/pilot/Header 等调试日志），
    // 避免敏感信息泄露与体积冗余
    config.when(process.env.NODE_ENV === 'production', cfg => {
      cfg.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions = args[0].terserOptions || {}
        args[0].terserOptions.compress = args[0].terserOptions.compress || {}
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    })
  },
};
