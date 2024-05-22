import express from "express";
import * as userController from "./controller/user.controller.js";
import { validation } from "../../utils/middleware/validation.js";
import { addUserSchema, editUserSchema } from "./user.validation.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
const userRouter = express.Router();

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(protectRoutes,validation(addUserSchema),allowTo("admin","employee"),userController.addUser);
userRouter
  .route("/:_id")
  .get(userController.getUserById)
  .put(validation(editUserSchema),userController.editUser)
  .delete(userController.deleteUser);

export default userRouter;
