# Code Review Guide

> This file is for human reviewers entering the codebase.
> The AI agent must NOT use this file for code generation.

---

## Before you start reviewing

1. Read CLAUDE.md to understand the project overview
2. Read specs/architecture.md to understand the system structure
3. Identify which spec files are relevant to the changes being reviewed
4. Check that requirement IDs from the spec are referenced in the changed code

---

## General Checklist

- [ ] The changed code matches the relevant spec requirements (FR-XXX)
- [ ] Acceptance Criteria from the spec are satisfied (AC-XXX)
- [ ] No new libraries or dependencies were added without updating architecture.md
- [ ] No hardcoded values that should come from the database or config
- [ ] Naming conventions from the relevant spec are followed

---

## Database Checklist

- [ ] GlobalControl always has exactly three rows — one per page
- [ ] GlobalControl rows are only updated, never deleted or re-inserted
- [ ] ErrorLog rows are only inserted, never updated or deleted
- [ ] createdAt in ErrorLog is always set by the backend, never by the frontend

---

## Backend Checklist

- [ ] All endpoints match the contracts defined in specs/shared/api-contracts.md
- [ ] Control state operations are always scoped to a specific page
- [ ] PATCH /api/control updates only the fields present in the request
- [ ] POST /api/logs always writes to the database — no silent failures
- [ ] All endpoints return 400 with a descriptive message for invalid requests

---

## Frontend Checklist

- [ ] Every subpage fetches its own GlobalControl state on load
- [ ] All buttons, inputs and table state are applied before the user can interact
- [ ] The entire table including headers is hidden when isTableVisible = false
- [ ] ERROR detection triggers only on exact uppercase "ERROR"
- [ ] Buttons turn red and POST /api/logs is called when ERROR is detected
- [ ] Buttons return to normal color when input value changes away from ERROR
- [ ] The admin page fetches all three page states at once and manages them independently
- [ ] Every page has navigation links to all other pages

---

## Common mistakes to watch for

- ERROR detection triggering on "error" or "Error" instead of only "ERROR"
- Button color not resetting after the input value changes away from "ERROR"
- Table headers remaining visible when isTableVisible = false
- Updating GlobalControl for the wrong page
- POST /api/logs being called without page or inputName
- Frontend sending a timestamp instead of letting the backend set it

---

## If spec and code conflict

The spec always wins. Either fix the code to match the spec, or open a discussion to update the spec first.
Never merge code that contradicts the spec without updating the spec.