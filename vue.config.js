module.exports = {
  outputDir: 'server/public',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000'
      }
    }
  }
}