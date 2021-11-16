const webpack = require('webpack')
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  webpack: config => {
    config.node = {
      fs: 'empty'
    }

    if (process.env.NODE_ENV === 'development') process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    }, {})

    config.plugins.push(new webpack.DefinePlugin(env))

    return config
  },
  images: {
    domains: ['res.cloudinary.com', 'lh4.googleusercontent.com', 'lh3.googleusercontent.com']
  }
})
