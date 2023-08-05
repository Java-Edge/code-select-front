/*
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-05-26 21:42:34
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-08-05 20:13:39
 */
module.exports = {
  lintOnSave: false,
  //   devServer: {
  //     proxy: "https://apimusic.linweiqin.com/"
  //   }
  publicPath: './',
  assetsDir: 'static',
  parallel: false,
  devServer: {
    proxy: {
      "/api/back": {
        // target: "http://106.52.239.29:8088/",
        target: "http://localhost:8088/",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite:{
          '^/api/back': '/'
        }
      },
      "/api/base": {
        // target: "http://106.52.239.29:8089/",
        target: "http://localhost:8089/",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite:{
          '^/api/base': '/'
        }
      },
    },
  },
}; 