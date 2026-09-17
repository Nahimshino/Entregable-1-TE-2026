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

En produccion Render ejecuta `npm install` y `npm start` desde `server/`. El servidor escucha el puerto entregado por `PORT` y expone `/health` para comprobar que esta activo.

## Supabase y RLS

La tabla requerida es `public.habits` con las columnas `id`, `name`, `completed` y `created_at`. Como este proyecto usa la publishable key sin autenticacion, RLS debe tener politicas de lectura, insercion, actualizacion y eliminacion para `anon` y `authenticated`. El SQL completo esta en el README de la raiz.

## Rutas

- `GET /health`
- `GET /api/habits`
- `POST /api/habits` con `{ "name": "Leer" }`
- `PUT /api/habits/:id` con `{ "completed": true }`
- `DELETE /api/habits/:id`
