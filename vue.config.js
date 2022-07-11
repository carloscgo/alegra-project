const appConfig = require('./src/app.config')

const isProduction = process.env.NODE_ENV === "production"

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', appConfig.title)

    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    config.resolve.extensions.delete('.vue')

    // Only enable performance hints for production builds,
    // outside of tests.
    config.performance.hints(
      isProduction && !process.env.VUE_APP_TEST && 'warning'
    )
  },
  css: {
    // Enable CSS source maps.
    sourceMap: !isProduction
  },
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      poll: true,
      aggregateTimeout: 5000
    },

    ...(process.env.VUE_ALEGRA_API_URL
      ? // Proxy API endpoints to the production base URL.
        { proxy: { '/api': { target: process.env.VUE_ALEGRA_API_URL } } }
      : // Proxy API endpoints a local mock API.
        { before: require('./tests/mock-api') })
  }
}
