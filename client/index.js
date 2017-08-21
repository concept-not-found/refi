import axios from 'axios'

export default (serverUri) => {
  const http = axios.create({
    baseURL: serverUri
  })

  return (name) => (args) =>
    http.post('/', {
      name,
      args
    })
      .then(({data: {result}}) => result)
}
