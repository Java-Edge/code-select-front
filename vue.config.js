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
        target: "http://106.52.239.29:8088/",
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
        '@a': path.join(__dirname, 'src'),
        '@s': path.join(__dirname, 'src/css'),
      }
    }
  }
}; 