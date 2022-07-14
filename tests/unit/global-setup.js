/* eslint-disable promise/param-names */
const app = require('express')()

app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

require('../mock-api')(app)

module.exports = () => {
  return new Promise((resolve, _reject) => {
    global.mockApiServer = app.listen(process.env.MOCK_API_PORT, resolve)
  })
}
