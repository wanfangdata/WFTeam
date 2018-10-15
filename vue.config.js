module.exports = {
  outputDir: 'server/public',
  pluginOptions: {
    proxy: {
        context: '/api',
        options: {
            target: 'http://localhost:8000/api',
            changeOrigin: true
        }
    }
  }
}