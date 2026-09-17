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

Los archivos `.env`, `.env.local`, `node_modules/`, `dist/` y los caches de TypeScript son locales y no se suben a GitHub.

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

Para detener cualquiera de los servidores, presiona `Ctrl + C` en su terminal.

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

Si ya creaste alguna política con el mismo nombre, no la ejecutes nuevamente. Puedes revisar las políticas en `Supabase > Authentication > Policies`.

## Endpoints

| Metodo | Ruta | Funcion |
|---|---|---|
| GET | `/health` | Comprueba el servidor |
| GET | `/api/habits` | Lista habitos |
| POST | `/api/habits` | Crea un habito |
| PUT | `/api/habits/:id` | Actualiza nombre o estado |
| DELETE | `/api/habits/:id` | Elimina un habito |

## GitHub

El repositorio privado es:

`https://github.com/Nahimshino/Entregable-1-TE-2026`

Flujo recomendado para nuevas funcionalidades:

```bash
git checkout -b feature/nombre-de-la-funcionalidad
git add .
git commit -m "feat: describe el cambio"
git push -u origin feature/nombre-de-la-funcionalidad
```

Luego crea un Pull Request hacia `main`. La rama `main` debe mantenerse protegida desde `Settings > Branches`.

## Despliegue en Render

Backend publicado: `https://entregable-1-te-2026.onrender.com`

1. Crea un Web Service conectado al repositorio de GitHub.
2. Selecciona `main` como rama.
3. Configura `server` como `Root Directory`.
4. Usa `npm install` como `Build Command`.
5. Usa `npm start` como `Start Command`.
6. Selecciona el plan Free.
7. Agrega estas variables en `Environment`:

```env
PORT=10000
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_PUBLISHABLE_KEY=tu-publishable-key
FRONTEND_URL=https://tu-proyecto.vercel.app
```

Render genera una URL similar a `https://tu-servicio.onrender.com`. Comprueba el servidor en `/health` antes de conectar el frontend.

## Despliegue en Vercel

Frontend publicado: `https://entregable-1-te-2026-kcrnuq4og-nahimu.vercel.app`

1. Importa el mismo repositorio de GitHub.
2. Selecciona `client` como `Root Directory`.
3. Usa Vite como framework preset.
4. Usa `npm run build` como comando de compilacion.
5. Usa `dist` como directorio de salida.
6. Agrega esta variable para Production, Preview y Development:

```env
VITE_API_URL=https://tu-servicio.onrender.com/api
```

Vercel genera una URL similar a `https://tu-proyecto.vercel.app`.

Despues de obtenerla, actualiza `FRONTEND_URL` en Render con esa URL exacta y vuelve a desplegar el backend. Esto permite que CORS acepte el frontend publicado.

## Verificacion de produccion

```bash
curl https://tu-servicio.onrender.com/health
curl https://tu-servicio.onrender.com/api/habits
```

En Vercel verifica crear, completar, descompletar, eliminar y recargar un habito.

## Build

```bash
cd client
npm run build
```

El frontend se despliega en Vercel con `client` como directorio raiz y `npm run build` como comando de compilacion.

El backend se despliega en Render con `server` como directorio raiz, `npm install` como build command y `npm start` como start command.
