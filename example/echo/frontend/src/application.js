import RfiClient from 'rfi-client'

const rfi = RfiClient('http://localhost:9080')

// this will lookup a function call echo on the remote
const remoteEcho = rfi('echo')

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
