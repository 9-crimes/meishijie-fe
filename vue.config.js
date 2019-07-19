// vue.config.js
module.exports = {
  publicPath: '/',
  devServer: {
      proxy: {
          '/api': {
              target: ' http://127.0.0.1:7001',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/api': ''
              }
          }
      }
  }
}