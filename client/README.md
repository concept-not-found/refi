rfi-client
==========
This is the client used make calls to rfi-server or Express servers with rfi-express-route.

Usage
-----

### Remote Function
Connect to the rfi-server.
```js
const RfiClient = require('rfi-client');

const rfi = RfiClient('http://uri-of-rfi-server');
```

Retrieve the function reference.
```js
const remoteFunction = rfi('someFunctionName');
```

Call the function as if it was local. It will return a promise.
```js
remoteFunction(someArguments, someOtherArguments)
  .then((someReturnValue) => {
    ...
  })
  .catch((error) => {
    ...
  });
```

### Remote Service
A service is a set of functions. Services can be retrieved by name as well.

```js
const remoteService = rfi('someServiceName');
```

Services will have all functions as properties and can be called as if they are local.
```js
remoteService.remoteFunction(someArguments, someOtherArguments)
  .then((someReturnValue) => {
    ...
  })
  .catch((error) => {
    ...
  });
```

Also See
--------
For the backend see rfi-server and rfi-express-route.

