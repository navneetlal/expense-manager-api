const response = {
  "405": {
    "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5",
    "title": "METHOD_NOT_ALLOWED",
    "status": 405,
    "detail": "Requested method is not supported for the requested resource."
  },
  "400": {
    "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
    "title": "BAD_REQUEST",
    "status": 400,
    "detail": "The request cannot be fulfilled due to bad syntax."
  },
  "401": {
    "type": "https://datatracker.ietf.org/doc/html/rfc7235#section-4.2",
    "title": "UNAUTHORIZED",
    "status": 401,
    "detail": "Authentication failed or not yet been provided."
  },
  "403": {
    "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3",
    "title": "FORBIDDEN",
    "status": 403,
    "detail": "The request was a legal request, but the server is refusing to respond to it."
  },
  "404": {
    "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4",
    "title": "NOT_FOUND",
    "status": 404,
    "detail": "The requested resource could not be found but may be available again in the future."
  },
  "413": {
    "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.11",
    "title": "REQUEST_ENTITY_TOO_LARGE",
    "status": 413,
    "detail": "The request is larger than the server is willing or able to process."
  },
  "500": {
    "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
    "title": "INTERNAL_SERVER_ERROR",
    "status": 500,
    "detail": "Server encountered an unexpected condition that prevented it from fulfilling the request."
  }
} as const;

export default response;