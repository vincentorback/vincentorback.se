module.exports = () => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('autoprefixer')(),
    require('postcss-csso')()
  ]
})
