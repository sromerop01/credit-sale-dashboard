# Auth con cookie HttpOnly — migración

Registro del cambio que cierra el pendiente de seguridad dejado por la limpieza de `react-doctor` (token de sesión ya no vive en JS, ni en memoria ni en `localStorage`; el backend ahora lo entrega vía cookie `HttpOnly`).

## Contexto

El backend (repo hermano Laravel) dejó de devolver el token en el body de `POST /v1/auth/login` y en su lugar setea una cookie `HttpOnly`. Además expone:

- `GET /v1/auth/me` — verifica si hay una sesión válida (para restaurarla al recargar la página, ya que el frontend no puede leer la cookie).
- `POST /v1/auth/logout` — invalida la cookie en el servidor.

## Cambios en el frontend

- **`src/api/auth.ts`** — reescrito sobre un helper `request()` compartido:
  - Todas las llamadas usan `credentials: 'include'` para que el navegador envíe/reciba la cookie automáticamente.
  - `login()` ya no espera ni devuelve un token; solo resuelve si la respuesta es `ok`.
  - Se agregaron `me()` y `logout()`.
- **`src/types/index.ts`** — se eliminó `LoginResponse` (ya no hay token que tipar). `AuthContextType` cambió de `{ token, login(token), logout(), isAuthenticated }` a `{ isAuthenticated, isLoading, login(), logout(): Promise<void> }`.
- **`src/contexts/AuthProvider.tsx`** — ya no guarda ningún token:
  - Al montar, llama `authApi.me()` para saber si la cookie del navegador todavía representa una sesión válida y fija `isAuthenticated` en consecuencia (`isLoading` cubre esa ventana de verificación).
  - `login()` solo marca `isAuthenticated = true` (el login real ya ocurrió vía `authApi.login`).
  - `logout()` llama a `authApi.logout()` para invalidar la cookie en el servidor y luego limpia el estado local.
- **`src/contexts/ProtectedRoute.tsx`** y **`src/pages/LoginPage/LoginPage.tsx`** — ambos esperan `isLoading` antes de decidir un redirect, para no expulsar al usuario a `/login` (ni al revés) mientras se resuelve la llamada a `/me`.

## Por qué esto sí resuelve el riesgo pendiente

Con el token en una cookie `HttpOnly`, JavaScript no puede leerlo bajo ningún escenario (ni en memoria, ni en `localStorage`, ni con un `fetch` interceptado por un XSS). El navegador la adjunta automáticamente en cada request al backend gracias a `credentials: 'include'`.

## Pendiente

- Confirmar contra el backend real (aún no probado end-to-end en este entorno) que:
  - `GET /v1/auth/me` responde 200 con sesión activa y 401 sin ella.
  - CORS acepta credenciales (`Access-Control-Allow-Credentials: true` + origen explícito, no `*`).
  - La cookie se marca `Secure` y con `SameSite` apropiado en producción.
- Volver a correr `npx react-doctor@latest --verbose` tras este cambio (último estado conocido antes de esta migración: 100/100).

## Verificación

- `npx tsc --noEmit` — sin errores.
- Cambios sin confirmar (unstaged) en el working tree para revisar con `git diff` antes de hacer commit.
