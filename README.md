# Todo REST API

A full-stack task management app, an Angular frontend and a Spring Boot REST API running as separate services, communicating over REST api.

![CI](https://github.com/OussEng/todo-rest-api/actions/workflows/ci.yml/badge.svg)
[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?logo=springboot&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%234169E1.svg?logo=postgresql&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2306B6D4.svg?logo=tailwindcss&logoColor=white)](#)


---

## Architecture

![Architecture Diagram](https://github.com/user-attachments/assets/84e7cb63-a1fc-4185-a5bb-e6f0e94a7bbb)



The Angular frontend follows **MVVM**, the component (ViewModel) binds to the template (View) and delegates HTTP calls to services (Model). The Spring Boot backend follows **MVC**, Controllers handle requests, delegate to Services, and return JSON responses wrapped in a consistent `ApiResponse` envelope.

---

## Tech Stack

| Layer     | Technology                                          | Pattern |
|-----------|-----------------------------------------------------|---------|
| Frontend  | Angular 21, TypeScript , Tailwind CSS                             | MVVM    |
| Backend   | Spring Boot 3.4.5, Java 21, Spring Data JPA         | MVC     |
| Database  | PostgreSQL                                          |         |
| CI        | GitHub Actions                                      |         |

---

## Project Structure

```
todo-rest-api/
├── frontend/        # Angular SPA
├── backend/         # Spring Boot REST API
└── .github/
    └── workflows/
        └── ci.yml   # CI Pipeline
```

### Backend highlights
- Layered architecture: Controller → Service → Repository
- DTOs for REST APIs
- Consistent `ApiResponse<T>` envelope for all responses
- Global exception handling
- CORS configured for frontend origin

### Frontend highlights
- Calls REST API via Angular services
- Modal dialogs and flash messages for user feedback

---

## API

Base URL: `http://localhost:8080/api/v1`

| Method | Endpoint             | Description      |
|--------|----------------------|------------------|
| GET    | `/tasks/all`         | Get all tasks    |
| GET    | `/task/{id}`         | Get task by ID   |
| POST   | `/task/create`       | Create a task    |
| PUT    | `/task/update/{id}`  | Update a task    |
| DELETE | `/task/delete/{id}`  | Delete a task    |

---

## Running Locally

### Backend
```bash
cd backend
mvn spring-boot:run
```
Requires PostgreSQL running with a `taskdb` database. See [`backend/README.md`](https://github.com/OussEng/todo-rest-api/blob/main/Backend/README.md) for setup.

### Frontend
```bash
cd frontend
npm install
ng serve
```

- Frontend: http://localhost:4200
- API: http://localhost:8080/api/v1
