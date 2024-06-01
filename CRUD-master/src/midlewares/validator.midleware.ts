export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Intenta analizar el cuerpo de la solicitud según el esquema proporcionado
    schema.parse(req.body);
    // Si la validación es exitosa, pasa al siguiente middleware
    next();
  } catch (error) {
    // Si la validación falla, envía una respuesta de error con los mensajes de error
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};
