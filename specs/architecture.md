# Architecture Overview

## Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | Next.js 14 (App Router)     |
| Backend  | Java 21 + Spring Boot 3     |
| ORM      | Spring Data JPA + Hibernate |
| Database | SQLite                      |
| Build    | Maven                       |
| Styling  | Tailwind CSS                |

---

## Pages

| Route       | Description                                       |
|-------------|---------------------------------------------------|
| /           | Admin page — manages control state for all subpages |
| /page-one   | Subpage One                                       |
| /page-two   | Subpage Two                                       |
| /page-three | Subpage Three                                     |

---

## System Components

### Frontend (Next.js)
Renders the admin page and three subpages.
The admin page fetches and manages the control state for all subpages.
Each subpage fetches its own control state and applies it to its UI elements.
Handles ERROR detection locally and reports events to the backend.

### Backend (Spring Boot)
Exposes a REST API consumed by the frontend.
Manages GlobalControl state per page.
Receives and stores ERROR log entries.
All API contracts are defined in specs/shared/api-contracts.md.

### Database (SQLite)
Two tables:
- **GlobalControl** — three rows, one per subpage, storing UI control flags
- **ErrorLog** — append-only log of all ERROR events from the frontend

---

## Communication

Frontend communicates with backend exclusively via REST API over HTTP.
Backend communicates with the database via Spring Data JPA.
There is no direct communication between frontend and database.

---

## Project Structure

| Directory  | Contents                |
|------------|-------------------------|
| /frontend  | Next.js application     |
| /backend   | Spring Boot application |
| /specs     | All specification files |