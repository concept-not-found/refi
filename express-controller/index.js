module.exports = () => {
  const modules = {}
  let currentRequest

  function controller(request, response, next) {
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
  }

  controller.register = (module) => {
    Object.assign(modules, module)
  }

  controller.injectRequest = () => currentRequest

  return controller
}
