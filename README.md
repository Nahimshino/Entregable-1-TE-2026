# Entregable 1 - Gestor de habitos

Aplicacion web full-stack para registrar, completar y eliminar habitos personales.

## Stack

- React + TypeScript + Vite
- Express + Node.js
- Supabase PostgreSQL
- Render para el backend
- Vercel para el frontend

## Estructura

```text
client/     Aplicacion React/Vite
server/     API Express
```

## Requisitos

- Node.js 20 o superior
- npm
- Cuenta de Supabase

## Instalacion local

Desde Git Bash, en la raiz del proyecto:

```bash
cd client
npm install
cp .env.example .env.local
```

Configura `client/.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

En otra terminal:

```bash
cd server
npm install
cp .env.example .env
```

Configura `server/.env` con los valores de Supabase:

```env
PORT=3000
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_PUBLISHABLE_KEY=tu-publishable-key
FRONTEND_URL=http://localhost:5173
```

Ejecuta el backend:

```bash
cd server
npm run dev
```

Ejecuta el frontend en otra terminal:

```bash
cd client
npm run dev
```

Abre `http://localhost:5173`.

## Base de datos

En el SQL Editor de Supabase, ejecuta una sola vez:

```sql
create table public.habits (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	completed boolean not null default false,
	created_at timestamptz not null default now()
);
```

La `SUPABASE_PUBLISHABLE_KEY` puede usarse en el backend y no reemplaza las políticas RLS.

Esta versión utiliza `SUPABASE_PUBLISHABLE_KEY`. Como RLS está activo y la aplicación todavía no tiene autenticación, crea las políticas públicas siguientes para que la API pueda operar:

```sql
alter table public.habits enable row level security;

create policy "public read habits"
on public.habits for select to anon, authenticated
using (true);

create policy "public create habits"
on public.habits for insert to anon, authenticated
with check (true);

create policy "public update habits"
on public.habits for update to anon, authenticated
using (true) with check (true);

create policy "public delete habits"
on public.habits for delete to anon, authenticated
using (true);
```

Estas políticas permiten que cualquier visitante lea y modifique hábitos. Para una versión segura, habría que añadir autenticación y asociar cada hábito a un usuario.

## Endpoints

| Metodo | Ruta | Funcion |
|---|---|---|
| GET | `/health` | Comprueba el servidor |
| GET | `/api/habits` | Lista habitos |
| POST | `/api/habits` | Crea un habito |
| PUT | `/api/habits/:id` | Actualiza nombre o estado |
| DELETE | `/api/habits/:id` | Elimina un habito |

## Build

```bash
cd client
npm run build
```

El frontend se despliega en Vercel con `client` como directorio raiz y `npm run build` como comando de compilacion.

El backend se despliega en Render con `server` como directorio raiz, `npm install` como build command y `npm start` como start command.
