import axios from 'axios'

function handleInvokeResponse({data: {result, value, error}}) {
  if (result === 'success') {
    return value
  }
  return Promise.reject(error)
}

export default (serverUri) => {
  const http = axios.create({
    baseURL: serverUri
  })

  return (name) => {
    let definitionPromise = undefined

    function proxy(...args) {
      return definitionPromise
        .then((httpInvoke) => httpInvoke(args))
    }

    definitionPromise = http.get(`/${name}`)
      .then(({data: definition}) => {
        switch (definition.type) {
          case 'function':
            return (args) => http.post(`/${name}`, args)
              .then(handleInvokeResponse)
          case 'service':
            definition['function-names'].forEach((functionName) => {
              proxy[functionName] = (...args) => http.post(`/${name}/${functionName}`, args)
                .then(handleInvokeResponse)
            })
            return Promise.reject(new Error(`${name} is a service and should not be called as a function`))
          default:
            return Promise.reject(new Error(`no registered function or service named ${name}`))
        }
      })
    
    return proxy
  }
}
