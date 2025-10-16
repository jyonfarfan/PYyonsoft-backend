import { Router } from "express";
import { userController } from "./user.controller";
import {
  checkEmailCreateUser,
  checkEmailUpdateUser,
  validateUserExists,
  validateUserId,
  validateUserInputCreate,
  validateUserUpdate,
} from "./user.middleware";
import { handleInputErrors } from "../auth/validation";
import { limiter } from "../../config/limiter";

const router = Router();
router.use(limiter);

router.param("userId", validateUserId);
router.param("userId", validateUserExists);

//ROUTES FOR USERS
router.get("/", userController.getAllUser);
router.post(
  "/",
  validateUserInputCreate,
  handleInputErrors,
  checkEmailCreateUser,
  userController.createUser
);
router.get("/:userId", userController.getUserById);
router.put(
  "/:userId",
  validateUserUpdate,
  checkEmailUpdateUser,
  handleInputErrors,
  userController.updateUserById
);
router.patch("/:userId", userController.deactivateUserById);
// router.patch("/:userId", userController.activateUserById);

export default router;
