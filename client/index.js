import axios from 'axios'

export default (serverUri) => {
  const http = axios.create({
    baseURL: serverUri
  })

  return (name) => (...args) =>
    http.post('/', {
      name,
      args
    })
      .then(({data: {result, value, error}}) => {
        if (result === 'success') {
          return value
        }
        return Promise.reject(error)
      })
}
