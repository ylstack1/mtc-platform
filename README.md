# CF CMS Template Monorepo

This repository contains the CF CMS Modern Dark Template and its Admin Frontend.

## Structure

- `packages/template`: The core template package.
- `apps/admin-frontend`: The new Vite + React + TypeScript admin frontend.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the admin frontend:
   ```bash
   npm run dev:frontend
   ```
   This starts the Vite development server for the admin frontend.

## Development

- **Frontend**: Located in `apps/admin-frontend`.
- **Template**: Located in `packages/template`.

The frontend consumes the template's theme via direct import (configured via path aliases).
