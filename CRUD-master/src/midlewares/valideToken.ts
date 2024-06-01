import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return; // Termina la ejecución de la función después de enviar la respuesta
  }

  jwt.verify(
    token,
    TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401).json({ error: "Token expired" });
        } else {
          res.status(401).json({ error: "Invalid token" });
        }
        return; // Termina la ejecución de la función después de enviar la respuesta
      }

      req.user = decoded;
      next(); // Continúa con el siguiente middleware o controlador de ruta
    }
  );
};
