rfi-express-route
=================
rfi-express-route can be added to an Express application to allow rfi-client to make remote calls.

Usage
-----
This package does not include Express. An instance of Express must be provided.

```js
const Express = require('express');
const RfiRoute = require('rfi-express-route');

// pass in Express package to create an instance of rfi-expres-route
const rfiRoute = RfiRoute(Express);

// your application instance
const application = Express();

// attach to a path of your choice
application.use(rfiRoute);

// register functions and services
rfiRoute.register({
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
const injectRequest = rfiRoute.injectRequest;
rfiRoute.register({
  // injected request must be the last argument
  // on the client side, the function should be called without the request
  someFunctionWithRequest(someArgument, request = injectRequest()) {
    ...
  }
});
```

Also See
--------
For a pre-packaged backend see rfi-server. For the client side see rfi-client.
