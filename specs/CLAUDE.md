# CLAUDE.md

## Project Overview

Four-page web application with a global UI control system.
Built with opencode as the AI coding agent.

- **Frontend:** Next.js 14 (App Router)
- **Backend:** Java 21 + Spring Boot 3
- **Database:** SQLite

## What needs to be implemented

### Admin page
A dedicated page at / where the operator can manage the UI control state of each subpage independently.
For each subpage it must be possible to toggle button availability, input editability and table visibility.

### Subpages
Three subpages at /page-one, /page-two and /page-three.
Each contains buttons, text inputs and a table whose behavior is controlled by the admin page.

### Global UI Control System
Each subpage has its own control state stored in the database.
The state defines whether buttons are disabled, inputs are readonly and the table is visible.
The admin page can change these states independently for each subpage.

### ERROR Detection System
When a user types the exact word "ERROR" into any text input on any subpage, all buttons on that page turn red and a log entry is sent to the backend and saved to the database.
When the input value changes away from "ERROR" the buttons return to their normal color.

### Logging
All ERROR events are stored in the database with the page route, input name and timestamp.

---

## Specs map

| File                          | Purpose                                      |
|-------------------------------|----------------------------------------------|
| specs/architecture.md         | Overall architecture and stack               |
| specs/shared/data-models.md   | Shared data models across FE and BE          |
| specs/shared/api-contracts.md | API contracts between frontend and backend   |
| specs/shared/error-codes.md   | Shared HTTP error codes                      |
| specs/database/spec.md        | SQLite schema and rules                      |
| specs/backend/spec.md         | Spring Boot rules and conventions            |
| specs/frontend/spec.md        | Next.js rules, pages and conventions         |
| specs/code-review.md          | Guide for human reviewers                    |

---

## Agent behavior rules

### General
1. ALWAYS read the relevant spec file before generating any code
2. Reference requirement IDs (FR-XXX, AC-XXX) in code comments
3. If the spec and existing code conflict — STOP and ask the user
4. If anything in the spec is unclear or ambiguous — STOP and ask the user
5. Never add libraries or dependencies not listed in the spec
6. Follow naming conventions defined in each spec file exactly
7. Do not create files outside the project structure defined in architecture.md

### Execution order
The agent MUST follow this sequence and complete each phase fully before moving to the next:

**Phase 1 — Database**
- Read specs/database/spec.md
- Create SQLite schema
- Verify both tables exist with correct structure
- Seed GlobalControl with three rows and default values

**Phase 2 — Backend**
- Read specs/backend/spec.md and specs/shared/api-contracts.md
- Implement all endpoints defined in api-contracts.md
- Verify each endpoint against its AC before moving on

**Phase 3 — Frontend**
- Read specs/frontend/spec.md and specs/shared/api-contracts.md
- Implement the admin page and all three subpages
- Implement ERROR detection logic
- Verify each AC before finishing

### When something is unclear
- Do NOT make assumptions
- Do NOT proceed with your own interpretation
- STOP and ask the user with a specific question referencing the spec section