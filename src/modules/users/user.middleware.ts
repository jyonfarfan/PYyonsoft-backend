import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { Op } from "sequelize";
import User from "./user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
//MODELO USUARIOS AL INGRESAR X CONSOLA
export const validateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("userId")
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

export const validateUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("Id del usuario no encontrado");
    res.status(404).json({ error: error.message });
  }
  req.user = user;

  next();
};

export const validateUserInputCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El Nombre no puede ir vacio desde el controlador")
    .run(req);
  await body("password")
    .notEmpty()
    .withMessage("El Password no puede ir vacio desde el controlador")
    .isLength({ min: 8, max: 16 })
    .withMessage("El password tiene que tener entre 8 y 16 caracteres")
    .run(req);
  await body("email")
    .notEmpty()
    .withMessage("El email no puede ir vacio desde el controlador")
    .isEmail()
    .withMessage("El email no tiene un formato valido")
    .run(req);
  await body("active")
    .notEmpty()
    .isBoolean()
    .withMessage("Active debe ser true o false")
    .run(req);
  await body("company_Id")
    .notEmpty()
    .withMessage("El id de la empresa no puede ir vacio")
    .run(req);
  await body("role_Id")
    .notEmpty()
    .withMessage("El id del rol no puede ir vacio")
    .run(req);
  next();
};
//VALIDAR SOLO SI TIENE CAMPOS SINO, DEJA LOS ANTERIORES EN UPDATE
export const validateUserUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto")
    .run(req);
  await body("password")
    .optional()
    .isLength({ min: 8, max: 16 })
    .withMessage("El password tiene que tener entre 8 y 16 caracteres")
    .run(req);
  await body("active")
    .optional()
    .isBoolean()
    .withMessage("Active debe ser true o false")
    .run(req);
  await body("email")
    .optional()
    .isEmail()
    .withMessage("El email no tiene un formato valido")
    .run(req);
  await body("company_Id")
    .optional()
    .isInt()
    .withMessage("company_Id debe ser un número entero")
    .run(req);
  await body("role_Id")
    .optional()
    .isInt()
    .withMessage("role_Id debe ser un número entero")
    .run(req);
  next();
};

//validar correo que no este duplicado AL INGRESAR X CONSOLA
export const checkEmailCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const checkEmailExists = await User.findOne({ where: { email } });
  if (checkEmailExists) {
    const error = new Error("Un Usuario con ese email ya esta registrado");
    res.status(409).json({ error: error.message });
  }
  next();
};

//VALIDAR CORREO QUE NO ESTE DUPLICADO AL ACTUALIZAR
export const checkEmailUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  // si no viene email, o es el mismo que ya tenía, salta
  if (!email || email === req.user!.email) {
    next();
    return;
  }
  // busca otro usuario distinto con ese email
  const exists = await User.findOne({
    where: {
      email,
      id: { [Op.ne]: req.user!.id },
    },
  });

  if (exists) {
    res
      .status(409)
      .json({ error: "Ese email ya está en uso por otro usuario" });
    return;
  }

  next();
};
