SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help

COMPOSE ?= docker compose

.PHONY: help up down logs ingest generate test-suite1 test-suite2 test-suite3 test-suite4

help: ## Show available commands.
	@awk 'BEGIN {FS = ":.*##"}; /^[a-zA-Z0-9_-]+:.*##/ {printf "%-16s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start project services (available after Phase 7 wiring).
	$(COMPOSE) up --build --detach

down: ## Stop project services.
	$(COMPOSE) down

logs: ## Follow project service logs.
	$(COMPOSE) logs --follow

ingest: ## Run the AI knowledge-base ingest command (available after Phase 5).
	$(COMPOSE) run --rm ai-service python -m app.ingest

generate: ## Run test-case generation (available in the next project stage).
	$(COMPOSE) run --rm ai-service python -m app.generate

test-suite1: ## Run functional automation tests (available after Phase 6).
	$(COMPOSE) run --rm automation pytest -m functional

test-suite2: ## Run cross-browser automation tests (available after Phase 6).
	$(COMPOSE) run --rm automation pytest -m cross_browser

test-suite3: ## Run responsive-design automation tests (available after Phase 6).
	$(COMPOSE) run --rm automation pytest -m responsive

test-suite4: ## Run performance and robustness tests (available after Phase 6).
	$(COMPOSE) run --rm automation pytest -m performance_robustness
