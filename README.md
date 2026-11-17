# Intelligent Black-Box Test Automation for Indico (Testgen)

Course project for Software Testing (ISTQB), Faculty of Sciences of Sfax.

The platform transforms approved requirements into structured black-box test cases, supports human review and validation, executes Selenium test suites across multiple viewports and browsers, and reports anomalies and execution results. Designed as an extensible, dynamic test platform.

## Project status

- **Phase 1**: Skeleton, contracts (`contracts/test_case.schema.json`), and guardrails.
- **Phase 3**: Laravel REST API backend, PostgreSQL database container, migrations, seeders, canonical schema validation, and 17 feature tests (Completed).
- **Phase 4**: Angular 19 frontend with interactive review, filtering, anomaly inspector, and execution flows (Completed).

## Prerequisites

- Docker Engine and Docker Compose
- Node.js 22+ and npm
- PHP 8.3+ and Composer
- Python 3.11+ (for upcoming automation and AI service)

## Configuration

Copy the root environment template:

```bash
cp .env.example .env
```

Database credentials and environment variables are pre-configured for the Docker PostgreSQL container:
- `DB_CONNECTION=pgsql`
- `DB_HOST=127.0.0.1`
- `DB_PORT=5432`
- `DB_DATABASE=testgen`
- `DB_USERNAME=testgen`
- `DB_PASSWORD=secret`

---

## Phase 3: Backend & Database Setup

### 1. Start the PostgreSQL Container

```bash
docker compose up -d db
```

Verify database health:
```bash
docker exec testgen-db pg_isready
```

### 2. Configure and Initialize Laravel Backend

```bash
cd backend
cp .env.example .env
php artisan key:generate
composer install
```

### 3. Run Migrations & Seeders

```bash
php artisan migrate --force
php artisan db:seed --force
```

The seeders populate:
- 6 User Stories (`US-05` through `US-10`)
- 7 canonical Test Cases (`TC-012` through `TC-018`) with preconditions, test data, and steps
- 2 Test Runs (Run 14 & Run 13) with full suite breakdowns and anomalies

### 4. Run Backend Tests

```bash
php artisan test
```
All 17 feature tests cover:
- `/api/health` connectivity
- User stories CRUD and validation
- Test cases CRUD, query filtering, and validation against `contracts/test_case.schema.json`
- Test runs persistence and retrieval

### 5. Start Backend Development Server

```bash
php artisan serve --port=8000
```

Endpoints available at `http://127.0.0.1:8000`:
- `GET /api/health`
- `GET|POST /api/user-stories`
- `GET|PUT|DELETE /api/user-stories/{id}`
- `GET|POST /api/test-cases`
- `GET|PUT|DELETE /api/test-cases/{id}`
- `GET|POST /api/test-runs`
- `GET|DELETE /api/test-runs/{id}`

---

## Phase 4: Frontend (Angular)

To run the frontend:

```bash
cd frontend
npm install
npm start
```
Served on `http://localhost:4200`.

---

## Makefile Commands

```bash
make help
make up
make down
make logs
```

## Guardrails

- Test design is black box: derive it from requirements, acceptance criteria, and business rules—never Indico source code.
- Never commit secrets. Keep API keys in `.env`.
- Canonical schema `contracts/test_case.schema.json` is the single source of truth for test cases.
- Pinned dependency versions in lockfiles (`composer.lock`, `package-lock.json`).
