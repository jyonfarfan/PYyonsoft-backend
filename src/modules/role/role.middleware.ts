import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Role from "./role.model";

declare global {
  namespace Express {
    interface Request {
      role?: Role;
    }
  }
}

export const validateRoleId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("roleId")
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

export const validateRoleIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roleId } = req.params;
  const role = await Role.findByPk(roleId);

  if (!role) {
    const error = new Error("Id del rol no encontrado");
    res.status(404).json({ error: error.message });
  }
  req.role = role;

  next();
};
export const checkRoleNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role_name } = req.body;
  const role = await Role.findOne({ where: { role_name: role_name } });

  if (role) {
    const error = new Error("Nombre del rol Ya Existe!");
    res.status(404).json({ error: error.message });
    return;
  }
  next();
};

export const validateRoleInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("role_name")
    .notEmpty()
    .withMessage("El nombre del rol no puede ir vacio")
    .run(req);
  await body("active")
    .notEmpty()
    .withMessage("El campo active puede ser true o false nada mas.")
    .run(req);

  next();
};
