# CRUD Project with TypeScript 🛠️

This is a basic project implementing CRUD (Create, Read, Update, Delete) operations using TypeScript for the backend.

## Initial Setup 🚀

### Installing TypeScript

Make sure you have TypeScript installed globally on your system:

```bash
npm install -g typescript
```

### Creating `tsconfig.json`

Create a `tsconfig.json` file in the root of the project with the following configuration:

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

### Installing Types for Libraries

Install type definition files for the libraries used in the project:

```bash
npm install --save-dev @types/express @types/morgan @types/cookie-parser @types/cors @types/bcryptjs @types/jsonwebtoken @types/node
```

### Installing Nodemon and ts-node

Nodemon is a tool that helps develop node.js based applications by automatically restarting the application when file changes are detected.

Ts-node is a TypeScript execution engine that compiles TypeScript code on-the-fly before running it.

Install these development tools globally or locally based on your preferences:

```bash
npm install -g nodemon ts-node
```

## Project Structure 📁

The project follows the following structure:

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

## Running the Project ▶️

### Compilation

To compile the project, use the following command:

```bash
tsc
```

This will compile the TypeScript code into JavaScript and generate the corresponding files in the `dist` directory.

### Running with Nodemon

To run the project with Nodemon, use the following command:

```bash
nodemon dist/index.js
```

This will start the server, and the project will be ready to receive requests. Nodemon will automatically restart the application when changes to files are detected.

### Running with Ts-node

To run the project with Ts-node, use the following command:

```bash
ts-node src/index.ts
```

This will start the server using Ts-node, which compiles and executes the TypeScript code on-the-fly.

## Contribution 🤝

Feel free to contribute to the project. You can open a new pull request to suggest improvements, fix bugs, or add new features.

Thank you for your interest in this project! 🙏
