import rfi from 'rfi-client'

const rfiServer = rfi('http://localhost:9080')
const remoteEcho = rfiServer('echo')

window.send = () => {
  document.getElementById('error').value = ''
  const payload = document.getElementById('payload').value
  remoteEcho(payload)
    .then((result) => {
      document.getElementById('result').value = result
    })
    .catch((error) => {
      document.getElementById('error').value = error.message
    })
}
