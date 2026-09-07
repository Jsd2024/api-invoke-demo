# Smart Todo Assistant

A responsive Angular 19 standalone todo dashboard with Angular Material, SCSS, local task persistence, and a floating mock chatbot prepared for a future API.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Build

```bash
npm run build
```

## Features

- Add, edit, complete, delete, search, and filter tasks.
- Task data persists in browser `localStorage`.
- Summary cards show total, completed, and pending tasks.
- Floating responsive chat widget with auto-scroll and simulated 800 ms responses.
- Mock response data lives in `public/assets/data/chat-responses.json`.

## Architecture

- `src/app/core/services/todo.service.ts` owns task state and persistence.
- `src/app/core/services/chat.service.ts` owns the response boundary. Replace `getResponse()` with `getResponseFromApi()` when a backend is available.
- `src/app/shared/models/` contains the task and chat contracts, including `ChatApiRequest` and `ChatApiResponse`.
- `src/app/features/` contains standalone todo and chatbot components.

The app is generated with SSR enabled, and browser-only local storage access is guarded for server rendering.
