# Deploy to Vercel (both frontend + backend)

Overview: This project is structured as a monorepo with `frontend/` (Vite React) and `backend/` (Express + Mongoose). The `api/` folder contains a serverless wrapper that mounts backend routes into Vercel functions and reuses a cached MongoDB connection.

Steps:
1. Push your repo to GitHub.
2. In Vercel, import the repository and set the Project Root to the repo root (default).
3. Ensure Environment Variables are set in Vercel:
   - `MONGO_URI` — Your MongoDB connection string
   - `DEEPMED_API_KEY` — API key used by `predictionService.js`
   - (Optional) `NODE_VERSION` or other vars as needed
4. Vercel will use `vercel.json` to build:
   - Frontend: built from `frontend/package.json` with `@vercel/static-build` (Vite produces `dist` by default)
   - API: any files under `api/` are served as serverless Node functions
5. Deploy. The frontend will be served from the root domain and backend endpoints will be available at `https://<your-deploy>/api/...`.

Notes & tips:
- Ensure `frontend` makes same-origin requests (i.e., use `/api/patients/predict`) — already updated in the code.
- Test endpoints in production (e.g., `POST /api/patients/predict`) using a REST client.
- If you hit connection limits, consider using a hosted DB that supports connection pooling or adapting further for serverless-friendly connection handling.
