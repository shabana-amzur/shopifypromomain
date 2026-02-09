# Frontend

This folder contains all frontend files for the React/Vite app. Move the following here:
- `App.tsx`, `index.tsx`, `index.html`, `constants.tsx`, `types.ts`, `vite.config.ts`, `tsconfig.json`, `postcss.config.js`, `tailwind.config.js`, `components/`, `api/`, `index.css`, etc.

## Attribution capture notes

- Submissions with UTM parameters forward every field to the backend and database.
- If visitors arrive from Google, Bing, or Yahoo without UTM tags, the API now fills sensible defaults (`utm_source`, `utm_medium`, and keyword when available from the referrer URL).
- Each form submission writes a new row, so repeat tests with the same email accumulate rather than overwrite.
