# Shared Data Models

> These models are used by both frontend and backend.
> Frontend uses them to understand API responses.
> Backend uses them as the basis for database entities.

---

## GlobalControl

Represents the UI control state for a specific page.
The table always contains exactly three rows — one per page.

| Field             | Type    | Default | Description                             |
|-------------------|---------|---------|-----------------------------------------|
| id                | Integer | —       | Auto-generated unique identifier        |
| page              | String  | —       | The route of the page this row controls |
| isButtonDisabled  | Boolean | false   | When true, all buttons on that page are disabled |
| isInputDisabled   | Boolean | false   | When true, all text inputs on that page are readonly |
| isTableVisible    | Boolean | true    | When false, the table on that page is fully hidden |

---

## ErrorLog

Represents a single ERROR event triggered from a page.

| Field     | Type     | Required | Description                              |
|-----------|----------|----------|------------------------------------------|
| id        | Integer  | yes      | Auto-generated unique identifier         |
| page      | String   | yes      | The page route where ERROR was typed     |
| inputName | String   | yes      | The name of the input that triggered it  |
| createdAt | DateTime | yes      | Timestamp set by the backend at insertion |