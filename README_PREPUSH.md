Pre-push checks and how to enable them
=====================================

This repository includes optional, versioned pre-push checks to run before you push to GitHub.
They currently perform basic frontend validation:

- Run the frontend linter (`npm run lint` in `frontend`).
- Build the frontend production bundle (`npm run build` in `frontend`).

Files included
--------------

- `scripts/prepush.sh` — POSIX script that runs the checks.
- `scripts/prepush.ps1` — PowerShell script that runs the same checks on Windows.
- `scripts/hooks/pre-push` — POSIX git hook wrapper (calls `prepush.sh`).
- `scripts/hooks/pre-push.ps1` — PowerShell git hook wrapper.

How to enable the versioned git hooks (recommended)
--------------------------------------------------
1. Tell Git to use the `scripts/hooks` folder for hooks (this is local to your repo and safe):

   ```bash
   git config core.hooksPath scripts/hooks
   ```

2. From now on, when you run `git push`, Git will execute `scripts/hooks/pre-push` or the PowerShell wrapper on Windows. The hook will run the checks and prevent the push if any step fails.

Notes and alternatives
----------------------
- If you prefer Husky (npm package) or a centralized CI check, you can instead install and configure Husky to run these scripts automatically.
- The scripts assume Node.js and npm are available and that you have installed the project dependencies (`npm install` in `frontend` and `backend`) beforehand.
- Adjust or extend the scripts to include backend lint/tests as you add them.

Usage without enabling hooks
----------------------------
You can run the checks manually from the repository root:

POSIX
```bash
sh ./scripts/prepush.sh
```

PowerShell
```powershell
.\scripts\prepush.ps1
```
