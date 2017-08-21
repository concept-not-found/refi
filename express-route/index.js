module.exports = (express) => {
  const modules = {}
  let currentRequest

  const router = express.Router()

  router.post('/', (request, response, next) => {
    Promise.resolve()
      .then(() => {
        const {name, args} = request.body
        try {
          currentRequest = request
          return modules[name](...args)
        } finally {
          currentRequest = undefined
        }
      })
      .then((value) =>
        response.send({
          result: 'success',
          value
        })
      )
      .catch((error) =>
        response.send({
          result: 'failure',
          error
        })
      )
      .catch(next)
  })

  router.register = (module) => {
    Object.assign(modules, module)
  }

  router.injectRequest = () => currentRequest

  return router
}
