# Credit Sale — Dashboard

Dashboard React + TypeScript para gestión de préstamos, rutas de cobro y clientes. Estructura inspirada en DreamsPOS, identidad visual basada en el sistema gráfico de Acumen Academy.

## Stack

- Vite 5
- React 18
- TypeScript 5 (strict)
- React Router DOM v6
- Lucide React (iconos)
- @fontsource/inter (tipografía bundled)
- CSS Modules + CSS Variables (sin Tailwind ni Bootstrap)

## Cómo correr

```bash
cd credit-sale-dashboard
pnpm install
pnpm dev
```

Abre http://localhost:5173

Rutas disponibles:
- `/login` — pantalla de acceso (estilo Acumen, sin sidebar)
- `/rutas` — rutas de cobro
- `/clientes` — listado de clientes

Otros scripts:

```bash
pnpm build        # Build de producción a dist/
pnpm preview      # Sirve el build localmente
pnpm typecheck    # Verifica tipos sin emitir
```

## Estructura

```
credit-sale-dashboard/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx              Bootstrap + router
    ├── App.tsx               Definición de rutas
    ├── types.ts              Tipos compartidos
    ├── styles/
    │   ├── tokens.css        Design tokens (paleta, tipografía, espaciado)
    │   └── globals.css       Reset y reglas base
    ├── components/
    │   ├── layout/           AppShell (con sidebar), AuthShell (login)
    │   ├── ui/               Button, Badge, Avatar, Input (notch)
    │   └── modules/          RouteCard, ClientTable
    ├── pages/
    │   ├── LoginPage.tsx     Login estilo Acumen (fuera del AppShell)
    │   ├── RoutesPage.tsx    Hero rust + grid 2x2 / 4x1 de rutas
    │   └── ClientsPage.tsx   Hero cyan + buscador + tabla
    └── data/
        └── mock.ts           Datos mock para desarrollo
```

## Sistema de diseño

Toda la paleta vive en `src/styles/tokens.css` como CSS variables. Cambia un valor allí y se propaga a toda la app.

Colores principales:

- `--color-cream` `#F4ECDC` — fondo de la app
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
- Tipografía Inter (400, 500, 700), titulares en 56px / -0.02em letter-spacing
- Sentence case en títulos y etiquetas

## Próximos pasos sugeridos

1. Conectar con la API real — reemplazar `mock.ts` por hooks `useRoutes()` / `useClients()` con fetch o react-query.
2. Agregar vistas de detalle: `/rutas/:id` y `/clientes/:id`.
3. Construir el módulo de Préstamos con plan de pagos y simulador.
4. Integrar autenticación, manejo de sesión y roles (admin / cobrador / supervisor).
5. Reportes con gráficos (recharts ya encaja con el lenguaje visual).
# credit-sale-dashboard
