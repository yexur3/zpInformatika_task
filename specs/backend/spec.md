# Backend Specification

> Stack: Java 21, Spring Boot 3, Spring Data JPA, SQLite, Maven
> See also: specs/shared/data-models.md, specs/shared/api-contracts.md, specs/database/spec.md

---

## Project Structure

| Directory    | Contents                  |
|--------------|---------------------------|
| controller/  | REST endpoints            |
| service/     | Business logic            |
| repository/  | Database access           |
| model/       | JPA entities              |
| dto/         | Request and response objects |

---

## Functional Requirements

### FR-BE-001: Database seeding on startup
On every application startup the backend MUST ensure all three GlobalControl rows exist.
If any are missing they MUST be created with default values as defined in specs/database/spec.md.

### FR-BE-002: Page-scoped control state
All read and update operations on GlobalControl MUST be scoped to a specific page.
It MUST NOT be possible to update the state of one page and affect another.

### FR-BE-003: Partial update support
Control state updates MUST apply only to the fields present in the request.
Fields not included in the request MUST remain unchanged.
The full updated object MUST be returned after every update.

### FR-BE-004: ERROR event persistence
Every valid ERROR log request MUST result in a new row in the ErrorLog table.
The createdAt timestamp MUST be set by the backend at the time of insertion.
If the database write fails the endpoint MUST return 500 and MUST NOT silently ignore the error.

### FR-BE-005: Input validation
All endpoints MUST reject requests with missing or invalid fields and return 400 with a descriptive message.
The specific required fields for each endpoint are defined in specs/shared/api-contracts.md.

---

## Acceptance Criteria

### AC-BE-001
Given the application starts with an empty database
When startup is complete
Then all three GlobalControl rows exist with correct page values and default flag values

### AC-BE-002
Given GlobalControl for /page-one has isButtonDisabled = false
When PATCH /api/control is called for /page-one with isButtonDisabled = true
Then the response contains the full /page-one object with isButtonDisabled = true and all other fields unchanged

### AC-BE-003
Given a valid POST /api/logs request with page and inputName
When the request is processed
Then a new ErrorLog row exists with the correct values and a backend-generated createdAt

### AC-BE-004
Given a POST /api/logs request with a missing field
When the request is processed
Then the response is 400 with a descriptive message and nothing is written to the database