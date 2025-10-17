import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Producto from "./producto.model";

declare global {
  namespace Express {
    interface Request {
      producto?: Producto;
    }
  }
}

//MODELO PRODUCTOS AL INGRESAR X CONSOLA
export const validateProductoId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("productoId")
    .isInt()
    .custom((value) => value > 0)
    .withMessage("ID no valido")
    .run(req);
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateProductoExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productoId } = req.params;
  const producto = await Producto.findByPk(productoId);

  if (!producto) {
    const error = new Error("Id del producto no encontrado");
    res.status(404).json({ error: error.message });
  }
  req.producto = producto;

  next();
};

export const validateProductInputCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("")
}