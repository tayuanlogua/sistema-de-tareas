

# Proyecto CRUD con TypeScript

Este es un proyecto básico que implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando TypeScript para el backend.

## Configuración inicial

### Instalación de TypeScript

Asegúrate de tener TypeScript instalado de manera global en tu sistema:

```bash
npm install -g typescript
```

### Creación de `tsconfig.json`

Crea un archivo `tsconfig.json` en la raíz del proyecto con la siguiente configuración:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Instalación de tipos para las bibliotecas

Instala los archivos de definición de tipos para las bibliotecas utilizadas en el proyecto:

```bash
npm install --save-dev @types/express @types/morgan @types/cookie-parser @types/cors @types/bcryptjs @types/jsonwebtoken @types/node
```

## Estructura del proyecto

El proyecto sigue la siguiente estructura:

```
- src/
  - controllers/
    - auth.controller.ts
    - tasks.controller.ts
  - middlewares/
    - validator.middleware.ts
    - validateToken.ts
  - routes/
    - auth.routes.ts
    - tasks.routes.ts
  - db.ts
  - index.ts
  - app.ts
- node_modules/
- tsconfig.json
- package.json
- README.md
```

## Ejecución del proyecto

### Compilación

Para compilar el proyecto, utiliza el comando:

```bash
tsc
```

Esto compilará el código TypeScript en JavaScript y generará los archivos correspondientes en el directorio `dist`.

### Ejecución

Para ejecutar el proyecto, utiliza el siguiente comando:

```bash
node dist/index.js
```

Esto iniciará el servidor y el proyecto estará listo para recibir peticiones.

## Contribución

Siéntete libre de contribuir al proyecto. Puedes abrir una nueva solicitud de extracción (pull request) para sugerir mejoras, corregir errores o agregar nuevas características.

¡Gracias por tu interés en este proyecto!
