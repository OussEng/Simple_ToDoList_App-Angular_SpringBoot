# Task Spring Boot REST API

REST API for the task management frontend. Built with Spring Boot 3, Spring Data JPA, and PostgreSQL.

## Stack

- Java 21
- Spring Boot 3.4.5
- Spring Data JPA (Hibernate)
- PostgreSQL
- Lombok
- Maven

## Prerequisites

- JDK 21+
- Maven 3.9+
- PostgreSQL

## Setup

1. **Create the database**
   ```sql
   CREATE DATABASE taskdb;
   ```

2. **Configure credentials** in `src/main/resources/application.properties`
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/
   spring.datasource.username=
   spring.datasource.password=
   ```
   Hibernate will auto-create the `tasks` table on first run (`ddl-auto=update`).

3. **Run**
   ```bash
   mvn spring-boot:run
   ```
   API is available at `http://localhost:8080/api/v1`

## API Endpoints

| Method | URL | Response |
|--------|-----|---------|
| GET | `/api/v1/tasks/all` | `ApiResponse<Task[]>` |
| GET | `/api/v1/task/{id}` |  `ApiResponse<Task>` |
| POST | `/api/v1/task/create` |  `Task` |
| PUT | `/api/v1/task/update/{id}`  | `ApiResponse<Task>` |
| DELETE | `/api/v1/task/delete/{id}`| `ApiResponse<null>` |

### ApiResponse envelope
```json
{
  "code": "200",
  "data": { ... },
  "message": "..."
}
```

## Project Structure

```
├───src
│   ├───main
│   │   ├───java
│   │   │   └───com
│   │   │       └───tasks
│   │   │           └───taskback
│   │   │               │   TaskbackApplication.java
│   │   │               │
│   │   │               ├───apiResponse
│   │   │               │       ApiResponse.java
│   │   │               │
│   │   │               ├───config
│   │   │               │       CorsConfig.java
│   │   │               │
│   │   │               ├───exception
│   │   │               │       GlobalExceptionHandler.java
│   │   │               │       TaskNotFoundException.java
│   │   │               │
│   │   │               └───task
│   │   │                   ├───controller
│   │   │                   │       TaskController.java
│   │   │                   │
│   │   │                   ├───dto
│   │   │                   │   ├───create
│   │   │                   │   │       CreateTaskDto.java
│   │   │                   │   │
│   │   │                   │   └───update
│   │   │                   │           UpdateTaskDto.java
│   │   │                   │
│   │   │                   ├───entity
│   │   │                   │       Task.java
│   │   │                   │
│   │   │                   ├───repository
│   │   │                   │       TaskRepository.java
│   │   │                   │
│   │   │                   └───service
│   │   │                           TaskService.java
│   │   │
│   │   └───resources
│   │           application.properties
│   │
│   └───test
│       └───java
│           └───com
│               └───tasks
│                   └───taskback
│                           TaskServiceTest.java
│

```

## Running Tests

```bash
mvn test
```
