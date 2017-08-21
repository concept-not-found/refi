module.exports = () => {
  const modules = {}

  function controller({body: {name, args}}, response, next) {
    Promise.resolve()
      .then(() =>
        modules[name](args)
      )
      .then((result) =>
        response.send({
          result
        })
      )
      .catch((error) =>
        response.status(500).send(error.message)
      )
  }

  controller.register = (module) => {
    Object.assign(modules, module)
  }

  return controller
}
