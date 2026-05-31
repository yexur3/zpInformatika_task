# Shared Error Codes

> These HTTP error codes are used across all backend endpoints.
> Frontend must handle all of these appropriately.

---

## Standard Error Codes

| Code | Name                  | When it occurs                                      |
|------|-----------------------|-----------------------------------------------------|
| 400  | Bad Request           | Request is missing required fields or has invalid values |
| 404  | Not Found             | Requested resource does not exist                   |
| 500  | Internal Server Error | Unexpected server or database failure               |

---

## Per Endpoint

### GET /api/control
| Code | Reason                        |
|------|-------------------------------|
| 500  | GlobalControl row not found or DB unavailable |

### PATCH /api/control
| Code | Reason                                         |
|------|------------------------------------------------|
| 400  | Request contains unknown or invalid fields     |
| 500  | DB write failed                                |

### POST /api/logs
| Code | Reason                              |
|------|-------------------------------------|
| 400  | Missing page or inputName in request |
| 500  | DB write failed                     |