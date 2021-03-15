module.exports = {
  runtimeCompiler: true,
  // '/sovdex/' path need for gh-pages
  // publicPath: process.env.NODE_ENV == 'production' ? '/sovdex/' : '/',
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    }
  },
  transpileDependencies: ['vuetify']
}