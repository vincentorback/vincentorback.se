module.exports = () => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-custom-properties')({
      preserve: false
    }),
    require('postcss-custom-media')(),
    require('autoprefixer')(),
    require('postcss-csso')()
  ]
})
