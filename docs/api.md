This document will describe the HTTP API of RFI.

Terms
=====
* __function__ - the real function implementation in the backend
* __service__ - a set of named functions
* __definition__ - a named function or service

Endpoints
=========

`GET /:name`
------------

Retrieves a definition by name.

### Response
* Always returns `http status` `200`
* Always returns `content-type: application/json`
* Always return a JSON object
* Result cases
  * When the given name is a definition of a function
  ```json
    {
      "result": "function"
    }
  ```
  * When the given name is a definition of a service
  ```json
    {
      "result": "service",
      "function-names": [
        "some function name",
        "some other function name",
        ...
      ]
    }
  ```
  * When the given name does not corresponse to a function nor service definition
  ```json
    {
      "result": "not found"
    }
  ```
  