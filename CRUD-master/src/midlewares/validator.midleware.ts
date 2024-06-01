import { Request, Response, NextFunction } from "express";
import * as yup from "yup"; // Importar yup
import { Schema } from "yup";

/**
 * Middleware to validar el cuerpo de la solicitud según un esquema.
 * @param {Schema<any>} schema - El esquema Yup para validar el cuerpo de la solicitud.
 * @returns {import("express").RequestHandler} Función middleware de Express.
 */
export const validateSchema =
  (schema: Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar el cuerpo de la solicitud según el esquema proporcionado
      schema.validateSync(req.body, { abortEarly: false });
      // Si la validación es exitosa, pasar al siguiente middleware
      next();
    } catch (error: any) {
      // Si la validación falla, enviar una respuesta de error con los mensajes de error
      return res
        .status(400)
        .json(error.errors.map((error: yup.ValidationError) => error.message));
    }
  };
