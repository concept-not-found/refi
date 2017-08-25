const RfiServer = require('rfi-server')

const rfiServer = RfiServer()

rfiServer.register({
  echo(message) {
    return message
  }
})

rfiServer.start(9080)
  .then(() => {
    console.log('start backend on http://localhost:9000')
  })
