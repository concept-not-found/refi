const Express = require('express')
const Cors = require('cors')
const BodyParser = require('body-parser')

const RfiController = require('rfi-express-controller')

const rfiController = RfiController()

const application = Express()
application.use(Cors())
application.use(BodyParser.json())
application.post('/', rfiController)

module.exports = () => {
  return {
    // escape hatch
    application,

    register: rfiController.register,
    injectRequest: rfiController.injectRequest,

    start(port) {
      application.listen(port)
    }
  }
}
