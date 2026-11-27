# PulseWorks AI

A responsive team workspace for task planning, built with React, Vite, and JavaScript. Tasks are stored in the browser with `localStorage`; no backend, authentication, or document service is connected.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```sh
npm install
cp .env.example .env
npm run dev
```

In PowerShell, use `Copy-Item .env.example .env` instead of `cp`. The API client reads `VITE_API_BASE_URL`, but the current task experience uses local storage and does not send requests.

## Available scripts

- `npm run dev` — start the Vite development server.
- `npm run build` — create a production build in `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run Oxlint.
- `npm test` — run task schema validation tests.

## Task data

The first visit starts with a few example tasks. Changes, including creating, editing, and deleting tasks, persist in this browser under the `pulseworks.tasks` local-storage key. Clearing browser storage resets the list to the examples.

The task form validates input with Zod and React Hook Form. The due date is compared against the local calendar day. Future workspace areas are presented as placeholders rather than simulated services.

## Environment

Copy `.env.example` to `.env` to override the app name, displayed environment, or API base URL. Do not put secrets in `VITE_*` variables: Vite exposes them to browser code.
