import { hashPassword } from "../auth/auth";
import User from "./user.model";
import UserSave from "./userPassword.model";
import type { Request, Response } from "express";
import Company from "../company/company.model";
import Role from "../role/role.model";

type userUpdateType = {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  company_Id?: number;
  role_Id?: number;
};

export class userController {
  static createUser = async (req: Request, res: Response) => {
    try {
      //GUARDO EL USUARIO CON PASSWORD SIN HASH
      let { id, name, password, email, active, company_Id, role_Id } = new User(
        req.body
      );
      if (name && typeof name === "string") {
        name = name.toUpperCase();
      }
      if (email && typeof email === "string") {
        email = email.toLowerCase();
      }
      const user = new User({
        id,
        name,
        password,
        email,
        active,
        company_Id,
        role_Id,
      });

      const userWithouthash = await UserSave.create({ email, password });
      await userWithouthash.save();
      //GUARDO EL USUARIO CON PASSWORD CON HASH
      user.password = await hashPassword(user.password);
      await user.save();

      res.status(201).json("Usuario Creado Correctamente desde el controlador");
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  static getAllUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findAll({
        order: [["name", "asc"]],
        where: { active: true },
        attributes: {
          exclude: ["password"],
        },
        //PARA AGREGAR MAS FILTROS SE PUEDEN AGREGAR LIMITES WHERE'S DE ESTA FORMA
        //limit:2, where: {active:false} o asi mismo los activos solamente, where: {active:true}
      });
      res.json(user);
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: error.message });
    }
  };
  static getUserById = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Company,
          attributes: ["rut", "alias"],
        },
        {
          model: Role,
          attributes: ["role_name", "active"],
        },
      ],
    });
    res.json(user);
  };

  static updateUserById = async (req: Request, res: Response) => {
    try {
      // Extraemos y normalizamos los nuevos datos
      let { name, password, email, active, company_Id, role_Id } = req.body;
      // const userSave: userUpdateNoHashType = req.body

      if (name && typeof name === "string") name = name.toUpperCase();
      if (email && typeof email === "string") email = email.toLowerCase();
      // 1️⃣ Actualizar primero en UserSave (sin hash)
      await UserSave.update(
        { email, password },
        { where: { id: req.user.id } }
      );

      // 2️⃣ Actualizar el modelo User (con hash)
      const updates: userUpdateType = {
        name,
        email,
        active,
        company_Id,
        role_Id,
      };

      if (password) {
        updates.password = await hashPassword(password);
      }

      await req.user.update(updates);

      res.json("Usuario actualizado correctamente desde el controlador");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deactivateUserById = async (req: Request, res: Response) => {
    await req.user.update({ active: false });
    res.json("Usuario Desactivado Correctamente desde el controlador");
  };
  static activateUserById = async (req: Request, res: Response) => {
    await req.user.update({ active: true });
    res.json("Usuario activado Correctamente desde el controlador");
  };
}
