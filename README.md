# Task Management System API 📝

This project is an API developed in Node.js with Express.js and TypeScript for task management with CRUD (Create, Read, Update, Delete) operations and an authentication and authorization system. Users can register and log in to access their own tasks. The API is consumable from Postman and is designed to be scalable and secure.

## Technologies Used 💻

- Node.js
- Express.js
- TypeScript
- MongoDB

## Required Functionalities 🚀

### Authentication and Authorization 🔒

- **User registration and login**: Users can register and log in to access their tasks.
- **Middleware to protect authenticated routes**: Middleware is implemented to protect routes that require authentication.

### Task Management ✅

- **CRUD of tasks**: Tasks can be created, read, updated, and deleted.
- **Attributes of tasks**: Each task has a title, description, due date, and status.

### Validation and Error Handling ❌

- **Validation of user inputs**: User inputs are validated to prevent incorrect data.
- **Error handling**: Errors are handled and appropriate responses are sent for a better user experience.

### Documentation 📄

- **API documentation with Swagger**: The API is documented with Swagger for easy understanding and use.
- **Instructions to run the project locally**: Clear instructions are provided to install and run the project locally.
- **JSDoc comments in the code**: Detailed comments are included in the code to facilitate understanding and maintenance.

### Best Practices 🌟

- **Clean and structured code**: The code follows TypeScript best practices to keep it clean and structured.
- **Proper use of Git**: Descriptive and regular commits are used for proper tracking of project development.

## Project Dependencies 📦

The dependencies used in this project are:

- express
- mongoose
- bcryptjs
- jsonwebtoken
- @types/express
- @types/bcryptjs
- @types/jsonwebtoken
- typescript
- nodemon (only for development)

## Commands Executed 🛠️

The following commands were executed to set up and run the project:

1. **Initialize the project**:

   ```bash
   npm init -y
   ```

2. **Install dependencies**:

   ```bash
   npm install express mongoose bcryptjs jsonwebtoken @types/express @types/bcryptjs @types/jsonwebtoken typescript
   ```

3. **Install nodemon (only for development)**:

   ```bash
   npm install --save-dev nodemon
   ```

4. **Compile TypeScript code**:

   ```bash
   tsc
   ```

5. **Run the application with nodemon**:

   ```bash
   nodemon dist/index.js
   ```

## Deliverables 📦

### Source Code:

- **GitHub repository**: [Link to Repository](https://github.com/tayuanlogua/sistema-de-tareas)

### Documentation:

- **API documented with Swagger**: [Link to Swagger Documentation](SWAGGER_URL)
- **Detailed README**: A detailed README is provided with setup, execution instructions, and architecture description.

### Explainer Video:

- **Explanatory video**: [Link to Explainer Video](<[VIDEO_URL](https://www.youtube.com/watch?v=iAICLpu3fng)>)

This project is developed with the aim of providing a robust and scalable solution for task management, complying with quality standards and best software development practices. If you have any questions or need more information, feel free to contact. Thank you for your interest in this project! 🙌

```

There you go! Let me know if you need further modifications or assistance!
```
