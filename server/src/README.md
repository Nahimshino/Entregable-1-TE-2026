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
SUPABASE_PUBLISHABLE_KEY=tu-publishable-key
FRONTEND_URL=http://localhost:5173
```

La publishable key no debe confundirse con una clave secreta; las políticas RLS siguen controlando el acceso.

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
