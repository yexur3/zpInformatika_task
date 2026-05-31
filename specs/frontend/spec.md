# Frontend Specification

> Stack: Next.js 14 (App Router), Tailwind CSS
> See also: specs/shared/data-models.md, specs/shared/api-contracts.md

---

## Project Structure

| Directory        | Contents                       |
|------------------|--------------------------------|
| app/             | Pages and routing              |
| app/page-one/    | Page One                       |
| app/page-two/    | Page Two                       |
| app/page-three/  | Page Three                     |
| components/      | Shared reusable components     |
| hooks/           | Custom hooks                   |
| lib/             | API call functions             |

---

## Naming Conventions

| Element    | Convention       | Example              |
|------------|------------------|----------------------|
| Component  | PascalCase       | GlobalTable.tsx      |
| Hook       | use + PascalCase | useGlobalControl.ts  |
| API call   | camelCase        | fetchGlobalControl() |
| Page route | kebab-case       | /page-one            |

---

## Routing

| Route        | Description                                      |
|--------------|--------------------------------------------------|
| /            | Admin page — manages control state for all pages |
| /page-one    | Page One                                         |
| /page-two    | Page Two                                         |
| /page-three  | Page Three                                       |

---

## Admin Page ( / )

The admin page displays the current GlobalControl state for all three pages simultaneously.
For each page it MUST provide controls to toggle isButtonDisabled, isInputDisabled and isTableVisible.
Every change MUST be sent immediately to PATCH /api/control for the corresponding page.
The admin page MUST NOT contain the standard page elements — no buttons, inputs or tables from the subpages.

---

## Subpages ( /page-one, /page-two, /page-three )

Each subpage MUST contain:
- Minimum 3 buttons
- Minimum 1 table with at least 3 columns and 3 rows of data
- Minimum 2 text inputs
- Navigation links to all other pages including the admin page

---

## Functional Requirements

### FR-FE-001: Load and apply control state
Every subpage MUST fetch its own GlobalControl state from GET /api/control on load.
The fetched state MUST be applied to all buttons, inputs and the table before the user can interact with anything.

### FR-FE-002: Apply control state to UI elements
When isButtonDisabled is true all buttons on the page MUST be disabled.
When isInputDisabled is true all text inputs MUST be readonly.
When isTableVisible is false the entire table including headers MUST be hidden from the page.

### FR-FE-003: Admin page loads all states
The admin page MUST fetch the GlobalControl state for all three pages at once using GET /api/control/all.
It MUST display and allow editing of each page state independently.

### FR-FE-004: ERROR detection and reporting
Every text input on every subpage MUST watch its value on every change.
When the value becomes exactly "ERROR" in uppercase, all buttons on that page MUST turn red and POST /api/logs MUST be called with the current page route and the input name.
When the value changes away from "ERROR" all buttons MUST return to their normal color.

---

## Acceptance Criteria

### AC-FE-001
Given a subpage loads and isButtonDisabled = true, isInputDisabled = true, isTableVisible = false
When the page finishes loading
Then all buttons are disabled, all inputs are readonly and the entire table including headers is not visible

### AC-FE-002
Given the admin page loads
When the page finishes loading
Then it displays the current control state for all three pages and allows toggling each flag independently

### AC-FE-003
Given a user types "ERROR" into any text input on a subpage
When the value change is detected
Then all buttons on that same subpage turn red and POST /api/logs is called with the correct page and inputName

### AC-FE-004
Given buttons on a subpage are red because "ERROR" was typed in one of its inputs
When the user changes that input value to anything other than "ERROR"
Then all buttons on that same page return to their normal color

### AC-FE-005
Given a user types "error" or "Error" into any text input
When the value change is detected
Then buttons do NOT turn red and POST /api/logs is NOT called