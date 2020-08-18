module.exports = {
  // Avoid the CORS error from vue-cli
  devServer: {
    proxy: 'http://backend.test/'
  }
}