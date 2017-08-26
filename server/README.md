rfi-server
==========

rfi-server is the simpliest backend for rfi-client.

rfi-server is just an Express server with rfi-express-route. If you need more control use rfi-express-route directly.

rfi-server comes with cors installed.

Usage
-----
```js
const RfiServer = require('rfi-server');

const rfiServer = RfiServer();

// register functions and services
rfiServer.register({
  someFunction(someArgument, someOtherArgument) {
    ...
  },

  someService: {
    someFunction(...allArguments) {
      ...
    }
  }
});

// the current request can be injected
const injectRequest = rfiServer.injectRequest;
rfiServer.register({
  // injected request must be the last argument
  // on the client side, the function should be called without the request
  someFunctionWithRequest(someArgument, request = injectRequest()) {
    ...
  }
});

// access the Express application instance if neccessary
rfiServer.application.use(...);

// start the server with your port of choice
rfiServer.start(9080)
  .then(() => {
    console.log('started server on http://localhost:9080')
  });
```

Also See
--------
For the client side see rfi-client. For a more control see rfi-express-route. 
