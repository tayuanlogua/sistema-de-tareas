import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  // Verificamos si el token está presente en las cookies
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  // Verificamos si el token es válido
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Si el token es válido, agregamos el usuario decodificado al objeto de solicitud (req)
    req.user = user;

    // Llamamos a next() para pasar al siguiente middleware o ruta
    next();
  });
};
