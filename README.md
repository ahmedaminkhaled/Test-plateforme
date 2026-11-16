# Intelligent Black-Box Test Automation for Indico

Course project for Software Testing (ISTQB), Faculty of Sciences of Sfax.

The platform will transform approved requirements into structured black-box test
cases, support human review, execute Selenium suites, and report results. Indico
is the application under test (AUT), but its source code is never used to derive
tests or added to the RAG knowledge base.

## Project status

Phase 1 establishes the repository structure and shared contracts only. Application
services, the Indico stack, and test implementation are added in later phases.

## Prerequisites

- Docker Engine and Docker Compose
- Node.js 22.22.1+ and npm
- PHP 8.3+ and Composer
- Python 3.11+ (project environments will be pinned separately)

## Configuration

Copy the safe template before running later phases:

```bash
cp .env.example .env
```

Keep API keys only in `.env`. Do not commit it. `BASE_URL` is the only project
setting for the separately managed Indico installation; its initial local value is
`http://localhost:8080`.

## Commands

```bash
make help
make up
make down
make logs
make ingest
make generate
make test-suite1
make test-suite2
make test-suite3
make test-suite4
```

The targets are created in this phase for a stable interface. `up`, service commands,
and test commands become runnable as their services are added in Phases 3–7.

## Layout

- `frontend/` — Angular application (Phase 4)
- `backend/` — Laravel REST API and queue orchestration (Phase 3)
- `ai-service/` — FastAPI RAG and LLM-provider service (Phase 5)
- `automation/` — Selenium, pytest, Page Object Model, and runner (Phase 6)
- `contracts/` — versioned API and test-case contracts
- `data/` — requirements and approved, black-box testing knowledge
- `infra/` — project infrastructure documentation; Indico remains separate
- `docs/` — report, architecture, and presentation material

## Guardrails

- Test design is black box: derive it from requirements, acceptance criteria, and
  business rules—not Indico source code.
- Never place secrets in version control.
- Pin project and container dependency versions when they are introduced.
- Do not use `latest` image tags.

## Indico

Phase 2 uses the official
[Indico containers repository](https://github.com/indico/indico-containers) from a
separate directory. It exposes Indico at `http://localhost:8080`; it is not merged
into this Compose file.
