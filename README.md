# Pavlo´s Store

Licorería con domicilio — tienda web estática (React 18 + Babel standalone, sin build step).

## Estructura

- `index.html` — punto de entrada
- `data.js` — catálogo de productos
- `app.jsx`, `screens.jsx`, `cards.jsx`, `components.jsx`, `checkout.jsx` — UI de la tienda
- `admin.jsx`, `admin.css`, `tweaks-panel.jsx` — panel de administración
- `pavlos.css`, `assets/` — estilos, tipografía y texturas
- `uploads/` — imágenes de producto

## Desarrollo local

Necesita servirse por HTTP (los `.jsx` se cargan con `fetch`):

```bash
npx serve .
```

## Despliegue

Desplegado en Vercel como sitio estático (sin framework, sin comando de build).
