import { Router } from "express";
import { login } from "./auth.controller";
import { limiter } from "../../config/limiter";

const router = Router();

router.use(limiter);

router.post("/", login);

export default router;
