import type { Request, Response } from "express";
import Role from "./role.model";

export class roleController {
  static createRol = async (req: Request, res: Response) => {
    try {
      let { role_name, active } = new Role(req.body);
      if (role_name && typeof role_name === "string") {
        role_name = role_name.toLowerCase();
      }
      const rol = new Role({ role_name, active }); //este es el objeto modificado
      await rol.save();
      res.status(201).json("Rol creado Correctamente");
    } catch (error) {
      //   console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static getAllRole = async (req: Request, res: Response) => {
    try {
      const role = await Role.findAll({
        order: [["id", "asc"]],
        //TODO: PARA AGREGAR MAS FILTROS SE PUEDEN AGREGAR LIMITES WHERE'S DE ESTA FORMA
        //limit:2, where: {active:false} o asi mismo los activos solamente, where: {active:true}
      });
      res.json(role);
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

  static getRoleById = async (req: Request, res: Response) => {
    const role = await Role.findByPk(req.role.id);

    res.json(role);
  };
  static updateRoleById = async (req: Request, res: Response) => {
    await req.role.update(req.body);
    res.json("Rol actualizado Correctamente desde el controlador");
  };
  static deactivateRolebyId = async (req: Request, res: Response) => {
    await req.role.update({ active: false });
    res.json("Rol Desactivado Correctamente desde el controlador");
  };
}
