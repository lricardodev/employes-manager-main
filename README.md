# Employees -Manager

<h3 align="left">This project was created with React, Vite, and Sass, Material UI </h3>
<p align="left">
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<a href="https://vitejs.dev/" target="_blank" rel="noreferrer"> <img src="https://vitejs.dev/logo.svg" alt="vite" width="40" height="40"/> </a>
</p>

## Available Scripts

### 1. Install the node modules with

### `npm install`

### 2. To run the project

### `npm run start` or `npm run dev`

Runs the app in the development mode using Vite.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Preview the production build locally.

### `npm run start:server`

Launches the server that created the endpoints that the project needs to run well
It will run in the port 3005

if you want you can set the port for the server in the scripts of the package.json
"start:server": "json-server --watch db.json --port 3005"

## Configuración de Variables de Entorno

El proyecto usa variables de entorno para configurar la URL de la API. **Por defecto, en producción sin configuración, usa un mock local con localStorage.**

### Desarrollo

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3005
```

Luego ejecuta `npm run start:server` para iniciar json-server.

### Producción con Mock Local (Por Defecto)

Si no configuras `VITE_API_BASE_URL` en producción, el proyecto usará automáticamente un mock local que:
- Usa `localStorage` para persistir datos
- Funciona completamente sin servidor
- Incluye los datos iniciales de `db.json`
- Permite todas las operaciones CRUD

**No necesitas hacer nada adicional** - el mock se activa automáticamente en producción si no hay URL de API configurada.

### Producción con Backend Real

Para usar un backend real en producción, crea un archivo `.env.production`:

```env
VITE_API_BASE_URL=https://tu-backend-api.com
```

O configura la variable de entorno en tu plataforma de hosting.

### Forzar Modo Mock

Para forzar el uso del mock incluso con URL configurada:

```env
VITE_USE_MOCK=true
```

**Nota:** Las variables de entorno deben comenzar con `VITE_` para ser accesibles en el código.

## Deploy

Para información detallada sobre cómo hacer deploy del proyecto, consulta [DEPLOY.md](./DEPLOY.md)

El proyecto está listo para desplegar. Solo necesitas:

1. Configurar la variable de entorno `VITE_API_BASE_URL` con la URL de tu backend
2. Ejecutar `npm run build`
3. Desplegar la carpeta `dist` en tu servicio de hosting preferido
