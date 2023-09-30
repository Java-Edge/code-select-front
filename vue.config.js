/*
 * @Descripttion:
 * @version:
 * @Author: 不败顽童
 * @Date: 2023-05-26 21:42:34
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-08-13 22:38:12
 */
const path = require('path'); // 先引入path模块
module.exports = {
  lintOnSave: false,
  publicPath: './',
  assetsDir: 'static',
  parallel: false,
  devServer: {
    proxy: {
      "/api/back": {
        // target: "http://106.52.239.29:8088/",
        target: "http://47.99.69.109:8088/",
        // target: "http://localhost:8088/",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite:{
          '^/api/back': '/'
        }
      },
      // "/api/base": {
      //   // target: "http://106.52.239.29:8089/",
      //   target: "http://localhost:8089/",
      //   changeOrigin: true,
      //   logLevel: "debug",
      //   pathRewrite:{
      //     '^/api/base': '/'
      //   }
      // },
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
