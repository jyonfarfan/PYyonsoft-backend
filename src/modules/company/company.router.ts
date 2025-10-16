import { Router } from "express";
import { companiesController } from "./company.controller";
import {
  checkRutCreateCompany,
  checkRutUpdateCompany,
  validateCompanyExists,
  validateCompanyId,
  validateCompanyInputCreate,
  validateCompanyUpdate,
} from "./company.middleware";
import { handleInputErrors } from "../auth/validation";
import { limiter } from "../../config/limiter";

const router = Router();
router.use(limiter);

//TODO: O TAMBIEN HACER UNA BUSQUEDA POR ID PERO CON UN WHERE HACIA EL RUT PERO CON EL ORM

router.param("companyId", validateCompanyId);
router.param("companyId", validateCompanyExists);

//ROUTES FOR COMPANIES
router.get("/", companiesController.getAllCompanies);
router.post(
  "/",
  validateCompanyInputCreate,
  handleInputErrors,
  checkRutCreateCompany,
  companiesController.createCompany
);
router.get("/:companyId", companiesController.getCompanyById);
//TODO: MIENTRAS MODIFICARE LA EMPRESA POR EL ID PERO MAS ADELANTE PUEDO HACERLO MEDIANTE EL RUT PARA QUE ME LO TRAIGA DESDE EL FRONT
router.put(
  "/:companyId",
  validateCompanyUpdate,
  checkRutUpdateCompany,
  handleInputErrors,
  companiesController.updateCompanyById
);
router.patch("/:companyId", companiesController.deactivateCompanybyId);

export default router;
