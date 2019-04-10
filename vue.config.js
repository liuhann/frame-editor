module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? 'http://cdn.danke.fun/frame-editor/'
    : '/',
  outputDir: 'lib'
}
