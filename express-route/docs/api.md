This document will describe the HTTP API of RFI. This is what is happending under the covers. For normal usage, see client/server documentation.

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
      "type": "function"
    }
    ```
  * When the given name is a definition of a service
    ```json
      {
        "type": "service",
        "function-names": [
          <some function name>,
          <some other function name>,
          <...>
        ]
      }
    ```
  * When the given name does not corresponse to a function nor service definition
    ```json
      {
        "type": "not found"
      }
    ```

`POST /:name`
-------------
Executes a function by name.

### Request
* `content-type` must be `application/json`
* body must be a JSON array

### Response
* Always returns `http status` `200`
* Always returns `content-type: application/json`
* Always return a JSON object
* Result cases
  * When function executes successfully
    ```json
      {
        "result": "success",
        "value": <return value of function>
      }
    ```
  * When body is not a JSON array
    ```json
      {
        "result": "failure",
        "error": {
          "message": "body must be a JSON array"
        }
      }
    ```
  * When name is not a definition
    ```json
      {
        "result": "failure",
        "error": {
          "message": "no function named <some name>"
        }
      }
    ```
  * When name is not a function definition
    ```json
      {
        "result": "failure",
        "error": {
          "message": "expected <some name> to be a function, but was a service"
        }
      }
    ```
  * When the function fails for other reasons
    ```json
      {
        "result": "failure",
        "error": <error or rejection from function>
      }
    ```

`POST /:service/:name`
----------------------
Executes a function by name in a service.

### Request
* `content-type` must be `application/json`
* body must be a JSON array

### Response
* Always returns `http status` `200`
* Always returns `content-type: application/json`
* Always return a JSON object
* Result cases
  * When function executes successfully
    ```json
      {
        "result": "success",
        "value": <return value of function>
      }
    ```
  * When body is not a JSON array
    ```json
      {
        "result": "failure",
        "error": {
          "message": "body must be a JSON array"
        }
      }
    ```
  * When service is not a definition
    ```json
      {
        "result": "failure",
        "error": {
          "message": "no service named <some service>"
        }
      }
    ```
  * When service is not a service definition
    ```json
      {
        "result": "failure",
        "error": {
          "message": "expected <some service> to be a service, but was a function"
        }
      }
    ```
  * When name is not on service
    ```json
      {
        "result": "failure",
        "error": {
          "message": "no function named <some name> on service <some service>"
        }
      }
    ```
  * When name is not a function on service
    ```json
      {
        "result": "failure",
        "error": {
          "message": "expected <some name> to be a function on service <some service>"
        }
      }
  * When the function fails for other reasons
    ```json
      {
        "result": "failure",
        "error": <error or rejection from function>
      }
    ```
