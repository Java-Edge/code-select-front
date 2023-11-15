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
