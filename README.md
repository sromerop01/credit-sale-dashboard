# Credit Sale — Dashboard

Dashboard React + TypeScript para gestión de préstamos, rutas de cobro y clientes. Identidad visual basada en el sistema gráfico de Acumen Academy.

## Stack

- Vite 8 (`@vitejs/plugin-react-oxc`)
- React 18
- TypeScript 5 (strict)
- Tailwind CSS v4 (config CSS-first vía `@theme` en `src/styles/index.css`)
- React Router DOM v6 (con future flags de v7)
- Lucide React (iconos)
- @fontsource/inter (tipografía bundled)
- react-hook-form + zod (validación de formularios)

## Cómo correr

```bash
npm install
npm run dev
```

Abre <http://localhost:5173>

Rutas disponibles:

- `/login` — pantalla de acceso (estilo Acumen, sin sidebar)
- `/rutas` — rutas de cobro (protegida)
- `/clientes` — listado de clientes (protegida)

Variables de entorno:

```bash
VITE_API_URL=http://localhost:3000   # base de la API (auth por cookie httpOnly)
```

Otros scripts:

```bash
npm run build        # Typecheck + build de producción a dist/
npm run preview      # Sirve el build localmente
npm run typecheck    # Verifica tipos sin emitir
```

## Estructura

Organización por features (dominios): cada feature agrupa sus páginas, componentes, api, tipos y datos. Lo transversal (primitivos UI, layout, utilidades) vive fuera de `features/`.

```text
credit-sale-dashboard/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts            Alias @/ → src/
└── src/
    ├── main.tsx              Bootstrap: router + AuthProvider + estilos
    ├── app/
    │   └── App.tsx           Definición de rutas
    ├── features/
    │   ├── auth/
    │   │   ├── api.ts        login / logout / me contra VITE_API_URL
    │   │   ├── components/   ProtectedRoute
    │   │   ├── context/      AuthContext + AuthProvider
    │   │   ├── hooks/        useAuth
    │   │   ├── pages/        LoginPage
    │   │   └── types.ts
    │   ├── routes/
    │   │   ├── components/   RouteCard
    │   │   ├── pages/        RoutesPage (hero rust + grid de rutas)
    │   │   ├── mock.ts       Datos mock (temporal, hasta conectar API)
    │   │   └── types.ts
    │   └── clients/
    │       ├── components/   ClientTable
    │       ├── pages/        ClientsPage (hero cyan + buscador + tabla)
    │       ├── mock.ts
    │       └── types.ts
    ├── components/
    │   ├── layout/           AppShell (con sidebar), AuthShell (login), Sidebar
    │   └── ui/               Button, Badge, Avatar, Input (sin lógica de dominio)
    ├── lib/
    │   └── http.ts           Clasificación de errores HTTP (client/server/network)
    ├── styles/
    │   └── index.css         Tailwind + design tokens (@theme) + capa base
    └── types/
        └── index.ts          Tipos compartidos (AcumenColor)
```

Reglas de dependencia:

- Las features importan de `components/`, `lib/` y `types/` — nunca al revés.
- Entre features solo se importa lo mínimo y de forma explícita (hoy: `clients` lee `mockRoutes` de `routes`; `layout/Sidebar` usa `useAuth` de `auth`).
- Imports entre carpetas distintas usan el alias `@/`; dentro de una misma feature, rutas relativas.
- Una feature nueva (préstamos, reportes, cobradores) se crea como carpeta en `features/` con el mismo esquema.

## Sistema de diseño

Toda la paleta vive en `src/styles/index.css` dentro del bloque `@theme` de Tailwind. Cambia un valor allí y se propaga a toda la app (genera utilidades como `bg-cream`, `text-navy`, `bg-rust`).

Colores principales:

- `--color-cream` `#F7F2EA` — fondo de la app (`--color-cream-soft` `#FAF6EC` para focus)
- `--color-navy` `#0E3A4A` — sidebar
- `--color-rust` `#C8552B` — acento cálido / mora
- `--color-cyan` `#0AA9C9` — cards / item activo del sidebar
- `--color-royal` `#2247DC` — cards / estado "nuevo"
- `--color-green` `#19A957` — cards / estado "al día"
- `--color-mint` `#B6E8DC` — cards / sin asignar
- `--color-mostaza` `#A8831F` — alternativa cálida

Reglas visuales:

- Cards de color sólido sin sombra ni border-radius (estilo editorial-flat de Acumen)
- Botones primarios siempre píldora negra
- Tablas con líneas horizontales finas negras, sin franjas alternadas
- Tipografía Inter (400, 500, 700), titulares hero en 56px / -0.02em (`text-hero`)
- Sentence case en títulos y etiquetas

## Próximos pasos sugeridos

1. Conectar con la API real — reemplazar los `mock.ts` por `api.ts` + hooks (`useRoutes()` / `useClients()`) en cada feature, idealmente con TanStack Query.
2. Agregar vistas de detalle: `/rutas/:id` y `/clientes/:id`.
3. Construir `features/loans/` (préstamos) con plan de pagos y simulador.
4. Roles de usuario (admin / cobrador / supervisor).
5. Reportes con gráficos (recharts encaja con el lenguaje visual).
