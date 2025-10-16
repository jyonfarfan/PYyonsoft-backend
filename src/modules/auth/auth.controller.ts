import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWT_CONFIG } from "../../config/jwt.config";
import { checkPassword } from "./auth";
import User from "../users/user.model";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // 1️⃣ Primera consulta: Solo para autenticación
    const userAuth = await User.findOne({
      where: { email },
      attributes: ["id", "email", "password", "active"],
    });
    if (!userAuth) {
      const error = new Error("Usuario no encontrado");
      res.status(401).json({ error: error.message });
      return;
    }
    if (!userAuth.active) {
      const error = new Error("Usuario inactivo");
      res.status(401).json({ error: error.message });
      return;
    }
    const isPasswordCorrect = await checkPassword(password, userAuth.password);

    if (!isPasswordCorrect) {
      const error = new Error("La Contraseña no coincide");
      res.status(401).json({ error: error.message });
      return;
    }
    const user = await User.findByPk(userAuth.id, {
      include: [
        {
          association: "company",
          attributes: ["id", "company_name"],
        },
        {
          association: "role",
          attributes: ["id", "role_name"], //TODOO: ACTUALIZAR ESTO CUANDO TENGA MI ROLE_NAME LISTO!!!
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });
    // Generar token JWT
    const token = jwt.sign(
      {
        id: user!.id,
        email: user!.email,
        roleId: user!.role_Id,
        companyId: user!.company_Id,
      },
      JWT_CONFIG.secret as string,
      {
        expiresIn: JWT_CONFIG.expiresIn,
        algorithm: JWT_CONFIG.algorithm,
      } as jwt.SignOptions
    );

    res.json({ user, token });
    res.json("Login Exitoso, Cargando!");

    return;
  } catch (e) {}
};
