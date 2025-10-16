import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { Op } from "sequelize";
import Company from "./company.model";

declare global {
  namespace Express {
    interface Request {
      company?: Company;
    }
  }
}
//MODELO compañias AL INGRESAR X CONSOLA
export const validateCompanyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("companyId")
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

export const validateCompanyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyId } = req.params;
  const company = await Company.findByPk(companyId);

  if (!company) {
    const error = new Error("Id de la empresa no encontrado");
    res.status(404).json({ error: error.message });
  }
  req.company = company;

  next();
};

export const validateCompanyInputCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("rut")
    .notEmpty()
    .withMessage("El RUT no puede ir vacio desde el controlador")
    .isLength({ min: 10, max: 10 })
    .withMessage("El RUT no puede tener menos o mas de 10 Caracteres")
    .run(req);
  await body("company_name")
    .notEmpty()
    .withMessage("El campo Company_name no puede ir Vacio desde el controlador")
    .run(req);
  await body("alias")
    .notEmpty()
    .withMessage("El campo alias no puede ir Vacio desde el controlador")
    .run(req);
  await body("business_line")
    .notEmpty()
    .withMessage(
      "El campo business_line no puede ir Vacio desde el controlador"
    )
    .run(req);
  await body("address")
    .notEmpty()
    .withMessage("El campo address no puede ir Vacio desde el controlador")
    .run(req);
  await body("phone")
    .notEmpty()
    .withMessage("El campo telefono no puede ir Vacio desde el controlador")
    .isLength({ min: 12, max: 12 })
    .withMessage(
      "El campo telefono tiene que tener 12 caracteres contando el +569"
    )
    .run(req);
  next();
};
//VALIDAR SOLO SI TIENE CAMPOS SINO, DEJA LOS ANTERIORES EN UPDATE
export const validateCompanyUpdate = async (
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
//validar RUT que no este duplicado AL INGRESAR X CONSOLA
export const checkRutCreateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rut } = req.body;

  const checkRutExists = await Company.findOne({ where: { rut } });
  if (checkRutExists) {
    const error = new Error("Una compañia con ese Rut ya esta registrada");
    res.status(409).json({ error: error.message });
  }
  next();
};

//VALIDAR CORREO QUE NO ESTE DUPLICADO AL ACTUALIZAR
export const checkRutUpdateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rut } = req.body;
  // si no viene rut, o es el mismo que ya tenía, salta
  if (!rut || rut === req.company!.rut) {
    res
      .status(409)
      .json({ error: "Este rut es el actual de la empresa seleccionada" });
    return;
  }
  // busca otra compañia distinto con ese rut
  const exists = await Company.findOne({
    where: {
      rut,
      id: { [Op.ne]: req.company!.id },
    },
  });

  if (exists) {
    res.status(409).json({ error: "Ese RUT ya está en uso por otra empresa" });
    return;
  }

  next();
};
