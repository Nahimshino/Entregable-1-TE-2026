# API de habitos

Este directorio contiene la API Express que conecta el frontend con Supabase.

## Archivos

- `index.js`: servidor HTTP, CORS y endpoints CRUD.
- `supabaseClient.js`: cliente de Supabase usando variables de entorno.

## Variables necesarias

Crea `server/.env` a partir de `server/.env.example`:

```env
PORT=3000
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
FRONTEND_URL=http://localhost:5173
```

No publiques `SUPABASE_SERVICE_ROLE_KEY` en el frontend ni en GitHub.

## Ejecucion

Desde `server/`:

```bash
npm install
npm run dev
```

## Rutas

- `GET /health`
- `GET /api/habits`
- `POST /api/habits` con `{ "name": "Leer" }`
- `PUT /api/habits/:id` con `{ "completed": true }`
- `DELETE /api/habits/:id`
