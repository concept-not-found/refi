import axios from 'axios'

export default (serverUri) => {
  const http = axios.create({
    baseURL: serverUri
  })

  return (name) => {
    let specificationPromise

    function x(...args) {
      return specificationPromise
        .then((f) => f(args))
    }

    specificationPromise = http.get(`/${name}`)
      .then(({data: specification}) => {
        switch (specification.result) {
          case 'function':
            return (args) => http.post(`/${name}`, args)
              .then(({data: {result, value, error}}) => {
                if (result === 'success') {
                  return value
                }
                return Promise.reject(error)
              })
          case 'service':
            specification['function-names'].forEach((functionName) => {
              x[functionName] = (...args) => http.post(`/${name}/${functionName}`, args)
                .then(({data: {result, value, error}}) => {
                  if (result === 'success') {
                    return value
                  }
                  return Promise.reject(error)
                })
            })
            return Promise.reject(new Error(`${name} is a service and should not be called as a function`))
          default:
            return Promise.reject(new Error(`no registered function or service named ${name}`))
        }
      })
    
    return x
  }
}
