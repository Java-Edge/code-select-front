/*
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-05-26 21:42:34
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-08-04 21:31:42
 */
module.exports = {
  lintOnSave: false,
  //   devServer: {
  //     proxy: "https://apimusic.linweiqin.com/"
  //   }
  devServer: {
    proxy: {
      "/back-server": {
        target: "http://127.0.0.1:9001/",
        // changeOrigin: true,
      }
    },
  },
};