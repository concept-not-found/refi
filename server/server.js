const Express = require('express')
const Cors = require('cors')
const BodyParser = require('body-parser')

const RfiRoute = require('rfi-express-route')

const rfiRoute = RfiRoute(Express)

const application = Express()
application.use(Cors())
application.use(BodyParser.json())
application.use(rfiRoute)

module.exports = () => {
  return {
    // escape hatch
    application,

    register: rfiRoute.register,
    injectRequest: rfiRoute.injectRequest,

    start(port) {
      return new Promise((resolve) => {
        application.listen(port, resolve)
      })
    }
  }
}
