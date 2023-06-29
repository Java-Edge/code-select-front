/*
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-05-26 21:42:34
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-06-29 21:51:41
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
      "/back-server": {
        target: "http://127.0.0.1:9001/",
        // target: "http://127.0.0.1:8088/",
        // target: "http://106.52.239.29:9001/",
        changeOrigin: true,
        logLevel: "debug",
        // pathRewrite:{
          // '^/back-server': '/'
        // }
      },
      "/api": {
        target: "http://s.linweiqin.com/",
      },
    },
  },
};
