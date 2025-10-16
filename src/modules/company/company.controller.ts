import type { Request, Response } from "express";
import Company from "./company.model";

export class companiesController {
  static createCompany = async (req: Request, res: Response) => {
    try {
      let {
        id,
        rut,
        company_name,
        alias,
        business_line,
        address,
        phone,
        active,
      } = new Company(req.body);
      if (company_name && typeof company_name === "string") {
        company_name = company_name.toUpperCase();
      }
      const company = new Company({
        id,
        rut,
        company_name,
        alias,
        business_line,
        address,
        phone,
        active,
      });
      // console.log(company);
      await company.save();
      res.status(201).json("Empresa Creada Correctamente desde el controlador");
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static getAllCompanies = async (req: Request, res: Response) => {
    try {
      const company = await Company.findAll({
        order: [["company_name", "asc"]],
        //PARA AGREGAR MAS FILTROS SE PUEDEN AGREGAR LIMITES WHERE'S DE ESTA FORMA
        //limit:2, where: {active:false} o asi mismo los activos solamente, where: {active:true}
      });
      res.json(company);
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

  static getCompanyById = async (req: Request, res: Response) => {
    const company = await Company.findByPk(req.company.id);

    res.json(company);
  };
  static updateCompanyById = async (req: Request, res: Response) => {
    try {
      const updates: Record<string, any> = { ...req.body };
      await req.company.update(updates);
      res.json("Empresa actualizada Correctamente desde el controlador");
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  static deactivateCompanybyId = async (req: Request, res: Response) => {
    await req.company.update({ active: false });

    res.json("Empresa Desactivada Correctamente desde el controlador");
  };
  //HACER UN PATCH COMPANYSELECTION PARA VOLVER A ACTIVAR LA EMPRESA QUE SE DESACTIVO.
}
