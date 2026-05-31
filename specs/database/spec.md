# Database Specification

> Database: SQLite
> ORM: Spring Data JPA + Hibernate
> See also: specs/shared/data-models.md

---

## Tables

### GlobalControl
Stores the UI control state for each page.
This table always contains exactly three rows — one per page.
Rows are seeded on first run and never deleted.

| Column           | Type    | Default | Constraints             |
|------------------|---------|---------|-------------------------|
| id               | INTEGER | —       | PRIMARY KEY, AUTOINCREMENT |
| page             | TEXT    | —       | NOT NULL, UNIQUE        |
| isButtonDisabled | BOOLEAN | false   | NOT NULL                |
| isInputDisabled  | BOOLEAN | false   | NOT NULL                |
| isTableVisible   | BOOLEAN | true    | NOT NULL                |

Initial rows:

| id | page        | isButtonDisabled | isInputDisabled | isTableVisible |
|----|-------------|------------------|-----------------|----------------|
| 1  | /page-one   | false            | false           | true           |
| 2  | /page-two   | false            | false           | true           |
| 3  | /page-three | false            | false           | true           |

### ErrorLog
Stores all ERROR events triggered from the frontend.

| Column    | Type     | Constraints                |
|-----------|----------|----------------------------|
| id        | INTEGER  | PRIMARY KEY, AUTOINCREMENT |
| page      | TEXT     | NOT NULL                   |
| inputName | TEXT     | NOT NULL                   |
| createdAt | DATETIME | NOT NULL                   |

---

## Functional Requirements

### FR-DB-001: Seeding on startup
On every application startup the backend MUST check whether the three GlobalControl rows exist.
If any of them are missing, the backend MUST insert them with default values.

### FR-DB-002: GlobalControl is updated in place
GlobalControl rows MUST only ever be updated — never deleted or re-inserted.
No new rows may be added to this table after the initial seed.

### FR-DB-003: ErrorLog is append-only
Rows in ErrorLog MUST only be inserted, never updated or deleted.

---

## Acceptance Criteria

### AC-DB-001
Given a fresh database
When the application starts
Then GlobalControl contains exactly three rows with correct page values and default flag values

### AC-DB-002
Given GlobalControl row for /page-one has isButtonDisabled = false
When PATCH /api/control is called for /page-one with isButtonDisabled = true
Then only the /page-one row is updated, the other two rows remain unchanged

### AC-DB-003
Given the backend receives a valid ERROR event
When it writes to ErrorLog
Then a new row appears with the correct page, inputName and a backend-generated createdAt