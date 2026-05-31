# API Contracts

> This file defines the communication contract between frontend and backend.
> Both frontend and backend agents must read this file.
> See also: specs/shared/data-models.md, specs/shared/error-codes.md

---

## GET /api/control

Returns the GlobalControl state for a specific page.
The page is passed as a query parameter, e.g. GET /api/control?page=/page-one

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| page      | String | yes      | The page route, e.g. /page-one |

Response:

| Field            | Type    |
|------------------|---------|
| id               | Integer |
| page             | String  |
| isButtonDisabled | Boolean |
| isInputDisabled  | Boolean |
| isTableVisible   | Boolean |

| Error | Reason                        |
|-------|-------------------------------|
| 400   | Missing or invalid page parameter |
| 500   | Database unavailable          |

---

## PATCH /api/control

Updates one or more control fields for a specific page.
Returns the full updated GlobalControl object for that page.

Request:

| Field            | Type    | Required |
|------------------|---------|----------|
| page             | String  | yes      |
| isButtonDisabled | Boolean | no       |
| isInputDisabled  | Boolean | no       |
| isTableVisible   | Boolean | no       |

Response: full updated GlobalControl object for that page.

| Error | Reason                                     |
|-------|--------------------------------------------|
| 400   | Missing page or unknown fields in request  |
| 500   | Database write failed                      |

---

## GET /api/control/all

Returns the GlobalControl state for all three pages at once.
Used by the admin page to display the state of all pages simultaneously.

Response: array of three GlobalControl objects, one per page.

| Error | Reason                |
|-------|-----------------------|
| 500   | Database unavailable  |

---

## POST /api/logs

Sends an ERROR event from the frontend to be stored in the database.

Request:

| Field     | Type   | Required |
|-----------|--------|----------|
| page      | String | yes      |
| inputName | String | yes      |

Response:

| Field     | Type     |
|-----------|----------|
| id        | Integer  |
| createdAt | DateTime |

| Error | Reason                          |
|-------|---------------------------------|
| 400   | Missing page or inputName       |
| 500   | Database write failed           |