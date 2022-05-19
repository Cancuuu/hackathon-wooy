const chalk = require("chalk")
const withImages = require('next-images')
const webpack = require('webpack')
const _ = require('lodash')
const Dotenv = require('dotenv-webpack');
const isProduction = process.env.NODE_ENV === 'production'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  generateEtags: false,
  future: {
    webpack5: true,
    strictPostcssConfiguration: true
  },
  compress: false,
  inlineImageLimit: 48, // make it tiny so that it doesn't inline,
  // exportTrailingSlash: true,
}


const allConfig =
  withBundleAnalyzer(
  withImages(
    {
      ...nextConfig,
      async redirects() {
        return [
          {
            source: '/prizes',
            destination: '/prizes/mainnet/PT-cDAI',
            permanent: true,
          }
        ]
      },
      publicRuntimeConfig: {
      },
      webpack(config, options) {
        // config.optimization.minimizer = []

        config.mode = isProduction ? 'production' : 'development'
        config.devtool = isProduction ? 'hidden-source-map' : 'eval-source-map'

        // Dotenv only loads referenced env variables
        config.plugins.push(new Dotenv({ignoreStub:true})); 

        return config
      }
    }
  ))

console.log('')
console.log(chalk.green('Using next.js config options:'))
console.log(allConfig)
console.log('')

module.exports = allConfig
