import { Router } from "express";
import { roleController } from "./role.controller";
import {
  validateRoleIdExists,
  validateRoleId,
  validateRoleInput,
  checkRoleNameExists,
} from "./role.middleware";
import { handleInputErrors } from "../auth/validation";
import { limiter } from "../../config/limiter";

const router = Router();
router.use(limiter);

router.param("roleId", validateRoleId);
router.param("roleId", validateRoleIdExists);

//ROUTES FOR ROLE
router.get("/", roleController.getAllRole);
router.post(
  "/",
  validateRoleInput,
  handleInputErrors,
  checkRoleNameExists,
  roleController.createRol
);
router.get("/:roleId", roleController.getRoleById);
router.put(
  "/:roleId",
  validateRoleInput,
  handleInputErrors,
  checkRoleNameExists,
  roleController.updateRoleById
);
router.patch("/:roleId", roleController.deactivateRolebyId);

export default router;
