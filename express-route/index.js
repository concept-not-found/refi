module.exports = (express) => {
  const definitions = {}
  let currentRequest

  const router = express.Router()

  router.get('/:name', ({params: {name}}, response, next) => {
    const definition = definitions[name]
    switch (typeof definition) {
      case 'function':
        return response.send({
          result: 'function'
        })
      case 'object':
        return response.send({
          result: 'service',
          'function-names': Object.keys(definition)
        })
      default:
        return response.send({
          result: 'not found'
        })
    }
  })

  router.post('/:name', (request, response, next) => {
    Promise.resolve()
      .then(() => {
        const {params: {name}, body: args} = request
        if (!(args instanceof Array)) {
          throw new Error('body must be a JSON array')
        }
        const functionDefinition = definitions[name]
        if (!functionDefinition) {
          throw new Error(`no function named ${name}`)
        }
        if (typeof functionDefinition !== 'function') {
          throw new Error(`expected ${name} to be a function, but was a service`)
        }
        try {
          currentRequest = request
          return functionDefinition(...args)
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

  router.post('/:service/:name', (request, response, next) => {
    Promise.resolve()
      .then(() => {
        const {params: {service, name}, body: args} = request
        if (!(args instanceof Array)) {
          throw new Error('body must be a JSON array')
        }
        const serviceDefinition = definitions[service]
        if (!serviceDefinition) {
          throw new Error(`no service named ${service}`)
        }
        if (typeof serviceDefinition !== 'object') {
          throw new Error(`expected ${service} to be an object, but was a function`)
        }
        const functionDefinition = serviceDefinition[name]
        if (!functionDefinition) {
          throw new Error(`no function named ${name} on service ${service}`)
        }
        if (typeof functionDefinition !== 'function') {
          throw new Error(`expected ${name} to be a function on service ${service}`)
        }
        try {
          currentRequest = request
          return functionDefinition(...args)
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


  router.register = (definition) => {
    if (typeof definition !== 'object') {
      throw new Error('definition must be an Object')
    }
    const filteredDefinitions = {}
    Object.keys(definition).forEach((name) => {
      if (typeof definition[name] === 'function') {
        const functionDefinition = definition[name]
        filteredDefinitions[name] = functionDefinition
      } else {
        const serviceDefinition = definition[name]
        const service = {}
        Object.keys(serviceDefinition).forEach((name) => {
          if (typeof serviceDefinition[name] === 'function') {
            service[name] = serviceDefinition[name]
          }
        })
        filteredDefinitions[name] = service
      }
    })
    Object.assign(definitions, filteredDefinitions)
  }

  router.injectRequest = () => currentRequest

  return router
}
