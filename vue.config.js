module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/frame-editor/'
    : '/',
  outputDir: 'lib'
}
