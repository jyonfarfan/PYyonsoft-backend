import { Router } from "express";
import { handleInputErrors } from "../auth/validation";
import { limiter } from "../../config/limiter";
import {
  validateProductoExists,
  validateProductoId,
} from "./producto.middleware";

const router = Router();
router.use(limiter);

router.param("productoId", validateProductoId);
router.param("productoId", validateProductoExists);
