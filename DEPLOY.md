# Deploying Disease Prediction

This document covers Option A: deploy the frontend on Vercel and the backend on a Node host (Render or Railway).

## Prerequisites
- Push repository to GitHub
- MongoDB Atlas (or any publicly accessible MongoDB), get connection string (MONGO_URI)

---

## Backend (Render or Railway)

1. Create a new service on Render (or Railway) and connect your GitHub repo.
2. Set the root / build/deploy directory to `backend`.
3. Ensure build/start commands are:
   - Build: (none needed for pure Node) or `npm install`
   - Start: `npm start`
4. Add environment variables in the service settings:
   - `MONGO_URI` — your MongoDB connection string
   - (optional) `PORT` — Render sets this automatically, not needed
5. Make sure `package.json` in `/backend` has a proper `start` script (it does: `node -r dotenv/config server.js`).
6. Deploy and check logs for `MongoDB connected`.

Notes:
- CORS is enabled in `backend/server.js` using the default settings. For tighter security you can pass an `origin` option to `cors()` with your Vercel frontend URL.

---

## Frontend (Vercel)

1. Create a new project on Vercel and connect your GitHub repo.
2. Set the project root directory to `frontend`.
3. Framework Preset: Vite. Build command: `npm run build`, Output Directory: `dist`.
4. Add an environment variable:
   - `VITE_API_BASE_URL` — the public URL of your deployed backend (e.g., `https://my-backend.onrender.com`)
5. Deploy the frontend. Vercel will build and publish the app.

Important:
- The frontend reads the API base from `import.meta.env.VITE_API_BASE_URL`. For local development the default is `http://localhost:5000` (see `frontend/.env`).
- If your backend is at `https://api.example.com`, set `VITE_API_BASE_URL=https://api.example.com` on Vercel.

---

## Post-deploy checks
- Visit your frontend URL and run a prediction; check browser devtools for network calls to ensure they hit `VITE_API_BASE_URL`.
- Check backend logs for incoming requests and MongoDB connection messages.

---

## Troubleshooting
- If CORS errors appear, set `app.use(cors({ origin: 'https://your-frontend.vercel.app' }))` in `backend/server.js` and redeploy backend.
- If MongoDB connection fails, ensure `MONGO_URI` is correct and allows connections from your backend host.

---

If you want, I can also prepare exact Render or Railway dashboard screenshots/steps or implement a CORS origin configuration to match a specific Vercel domain. Let me know which host you prefer for the backend and I’ll continue.

---

## Deploy hints & automatic config

- I added a `render.yaml` manifest at the repo root to make deploying to Render easier (`render.yaml`). It defines a `web` service pointing to the `backend` folder with `start`/`build` commands. After you connect the repo in Render, simply confirm the service and set the required secrets in Render's Environment tab.
- The backend now reads an optional `FRONTEND_URL` env var and will configure CORS to allow only that origin when set. This improves production security.

## Quick Env Var Guides

### Vercel (Frontend)
1. Go to your Vercel project > Settings > Environment Variables.
2. Add `VITE_API_BASE_URL` → value: your backend's public URL (e.g., `https://my-backend.onrender.com`).
3. Add variables for `Production`, `Preview`, and `Development` as needed.

### Render (Backend)
1. Go to your Render service > Environment > Environment Variables.
2. Add `MONGO_URI` with your MongoDB connection string.
3. Deploy; check the Build & Deploy logs.

### Railway (Backend)
1. Create a new Railway project and connect the repo.
2. Under Project Settings > Variables, add `MONGO_URI`.
3. Deploy and check logs.

If you want, I can set these environment variables for you and/or prepare the exact values to paste into each dashboard once you tell me which platform you'd like to use for the backend.