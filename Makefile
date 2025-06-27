# Dreckly Nx Monorepo Makefile
# Common commands for development, testing, and deployment

.PHONY: help install dev build test lint clean e2e typecheck format check-all

# Default target
help:
	@echo "Available commands:"
	@echo "  install     - Install all dependencies"
	@echo "  dev         - Start development server"
	@echo "  build       - Build all projects"
	@echo "  test        - Run all tests"
	@echo "  lint        - Run linting"
	@echo "  e2e         - Run end-to-end tests"
	@echo "  typecheck   - Run TypeScript type checking"
	@echo "  format      - Format code with Prettier"
	@echo "  clean       - Clean build artifacts"
	@echo "  check-all   - Run lint, test, and typecheck"
	@echo "  serve       - Serve the built application"
	@echo "  graph       - Show dependency graph"

# Install dependencies
install:
	npm install

# Development
dev:
	nx serve dreckly

# Build
build:
	nx build dreckly

# Testing
test:
	nx run-many --target=test --all

test-watch:
	nx run-many --target=test --all --watch

test-specific:
	@echo "Usage: make test-specific PROJECT=<project-name>"
	@echo "Example: make test-specific PROJECT=dreckly"
	nx test $(PROJECT)

# Linting
lint:
	nx run-many --target=lint --all

lint-fix:
	nx run-many --target=lint --all --fix

# End-to-end tests
e2e:
	nx e2e dreckly-e2e

e2e-watch:
	nx e2e dreckly-e2e --watch

# Type checking
typecheck:
	nx run-many --target=typecheck --all

# Code formatting
format:
	npx prettier --write "**/*.{ts,tsx,js,jsx,json,md}"

format-check:
	npx prettier --check "**/*.{ts,tsx,js,jsx,json,md}"

# Clean build artifacts
clean:
	nx reset
	rm -rf dist/
	rm -rf .nx/cache/

# Run all checks
check-all: lint test typecheck

# Serve built application
serve:
	nx serve-static dreckly

# Show dependency graph
graph:
	nx graph

# Development utilities
dev-tools:
	@echo "Opening Nx development tools..."
	nx graph --file=graph.html
	@echo "Dependency graph saved to graph.html"

# Database and data utilities
mock-data:
	@echo "Starting mock data server..."
	nx serve dreckly --port=3001

# Production build
prod-build:
	nx build dreckly --prod

# Docker commands (if using Docker)
docker-build:
	docker build -t dreckly .

docker-run:
	docker run -p 3000:3000 dreckly

# Git utilities
git-clean:
	git clean -fd
	git reset --hard HEAD

# Dependency management
update-deps:
	npm update
	nx migrate latest

# Performance analysis
analyze:
	nx build dreckly --analyze

# Storybook (if using)
storybook:
	nx run dreckly:storybook

# Component testing
component-test:
	nx run-many --target=test --projects=ui-kit,feature-*

# Library builds
build-libs:
	nx run-many --target=build --projects=ui-kit,data-access,state,types,utils

# Watch mode for development
watch:
	nx run-many --target=build --all --watch

# Health check
health:
	@echo "Running health checks..."
	@echo "1. Checking dependencies..."
	npm ls --depth=0
	@echo "2. Running type check..."
	$(MAKE) typecheck
	@echo "3. Running lint check..."
	$(MAKE) lint
	@echo "4. Running tests..."
	$(MAKE) test
	@echo "Health check complete!"

# Quick start for new developers
setup:
	@echo "Setting up development environment..."
	$(MAKE) install
	$(MAKE) typecheck
	$(MAKE) lint
	@echo "Setup complete! Run 'make dev' to start development server." 