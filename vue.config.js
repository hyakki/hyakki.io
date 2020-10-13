module.exports = {
  lintOnSave: false,
  publicPath: '',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/utils/_index.scss';`,
      },
    },
  },
}
