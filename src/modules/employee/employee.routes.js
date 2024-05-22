
import express from 'express';
const userRouter = express.Router();
import * as employeeController from './employee.controller.js';
import { allowTo, protectRoutes } from '../auth/auth.controller.js';
import { onlineFileUpload } from '../../utils/services/fileUploader.js';
userRouter
  .route("/")
  .get(employeeController.getAllUsers)
  .post( protectRoutes,allowTo("admin"),onlineFileUpload(),employeeController.addUser);

userRouter
  .route("/:id")
  .get(employeeController.getUserById)
  .put(protectRoutes,allowTo("admin"),onlineFileUpload(),employeeController.editUser) //multer parse the file and save it in req.file
  .delete(protectRoutes,allowTo("admin"),employeeController.deleteUser);

export default userRouter;
