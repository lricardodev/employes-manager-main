# Guía de Deploy

Este proyecto está configurado para usar variables de entorno para la URL de la API, permitiendo diferentes configuraciones para desarrollo y producción.

**IMPORTANTE:** Por defecto, el proyecto incluye un **mock local con localStorage** que funciona en producción sin necesidad de un backend. Los datos se persisten en el navegador del usuario.

## Configuración de Variables de Entorno

### Desarrollo Local

Para desarrollo local con `json-server`, crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3005
```

### Producción

Para producción, crea un archivo `.env.production` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://tu-backend-api.com
```

**Nota:** Las variables de entorno en Vite deben comenzar con `VITE_` para ser expuestas al código del cliente.

## Opción 0: Mock Local (Por Defecto) ⭐

**Esta es la opción más simple y ya está configurada por defecto.**

El proyecto incluye un servicio mock que:
- ✅ Funciona sin servidor
- ✅ Usa localStorage para persistir datos
- ✅ Incluye los datos iniciales de `db.json`
- ✅ Soporta todas las operaciones CRUD
- ✅ Funciona en cualquier hosting estático

**No necesitas hacer nada** - simplemente haz el build y despliega. El mock se activa automáticamente en producción si no hay `VITE_API_BASE_URL` configurada.

Los datos se guardan en el navegador del usuario, así que cada usuario tendrá su propia "base de datos" local.

## Opciones para el Backend en Producción

### Opción 1: MockAPI (Recomendado para prototipos con datos compartidos)

[MockAPI](https://mockapi.io/) es un servicio gratuito que permite crear APIs REST rápidamente.

1. Crea una cuenta en [mockapi.io](https://mockapi.io/)
2. Crea un nuevo proyecto
3. Crea los recursos: `employees`, `users`, `areas`
4. Importa los datos desde `db.json`
5. Usa la URL del proyecto en `.env.production`:
   ```env
   VITE_API_BASE_URL=https://TU-PROYECTO.mockapi.io
   ```

### Opción 2: JSONPlaceholder (Solo lectura)

[JSONPlaceholder](https://jsonplaceholder.typicode.com/) es gratuito pero solo permite operaciones de lectura (GET). No es adecuado para este proyecto que necesita POST, PUT, DELETE.

### Opción 3: Backend Propio

Puedes desplegar tu propio backend usando:

- **Node.js + Express + json-server**: Despliega json-server en un servicio como Heroku, Railway, o Render
- **Node.js + Express + Base de datos**: Crea un backend completo con MongoDB, PostgreSQL, etc.
- **Firebase**: Usa Firebase Realtime Database o Firestore
- **Supabase**: Backend como servicio con PostgreSQL

### Opción 4: Desplegar json-server

Puedes desplegar `json-server` directamente en servicios como:

- **Railway**: https://railway.app/
- **Render**: https://render.com/
- **Heroku**: https://www.heroku.com/

Ejemplo de configuración para Railway/Render:

1. Crea un archivo `server.js`:
```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT || 3005, () => {
  console.log('JSON Server is running');
});
```

2. Actualiza `package.json` para incluir un script de servidor
3. Despliega con el archivo `db.json`

## Build y Deploy del Frontend

### Build para Producción

```bash
npm run build
```

Esto creará una carpeta `dist` con los archivos estáticos listos para desplegar.

### Opciones de Hosting para el Frontend

- **Vercel**: https://vercel.com/ (Recomendado, muy fácil)
- **Netlify**: https://www.netlify.com/
- **GitHub Pages**: Gratis para proyectos públicos
- **Firebase Hosting**: https://firebase.google.com/docs/hosting
- **Surge.sh**: https://surge.sh/

### Deploy en Vercel (Recomendado)

1. Instala Vercel CLI: `npm i -g vercel`
2. En la raíz del proyecto, ejecuta: `vercel`
3. Configura las variables de entorno en el dashboard de Vercel:
   - `VITE_API_BASE_URL` = URL de tu backend
4. El deploy se hará automáticamente en cada push a tu repositorio

### Deploy en Netlify

1. Conecta tu repositorio a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`
4. Agrega las variables de entorno en Site settings > Environment variables:
   - `VITE_API_BASE_URL` = URL de tu backend

## Verificación

Después del deploy, verifica que:

1. El frontend carga correctamente
2. Las llamadas a la API apuntan a la URL correcta (revisa la consola del navegador)
3. Las operaciones CRUD funcionan correctamente

## Troubleshooting

### Error: "Network Error" o CORS

Si recibes errores de CORS, asegúrate de que tu backend permita requests desde el dominio de tu frontend. Para desarrollo local, puedes configurar CORS en json-server o usar un proxy en Vite.

### Variables de entorno no funcionan

- Asegúrate de que las variables comiencen con `VITE_`
- Reinicia el servidor de desarrollo después de cambiar `.env`
- En producción, verifica que las variables estén configuradas en la plataforma de hosting

