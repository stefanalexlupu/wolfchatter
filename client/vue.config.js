module.exports = {
  // Avoid the CORS error from vue-cli
  devServer: {
    proxy: 'http://backend.test/'
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/](leaflet)[\\/]/,
                name: 'leaflet',
                chunks: 'all',
              }
            }
          }
        }
      }
    }
  }
}