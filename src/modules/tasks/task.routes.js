import express from "express";
import * as taskController from "./controller/task.controller.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { validation } from "../../utils/middleware/validation.js";
import { addTaskSchema, deleteTaskSchema, updateTaskSchema } from "./task.validator.js";

const taskRouter = express.Router();
taskRouter
  .route("/")
  .post(protectRoutes, allowTo("admin"),validation(addTaskSchema), taskController.addTask)
  .get(taskController.getAllTasks)
  

taskRouter
.route("/:_id")
.get(taskController.getAllTasksOfUser)
.put(protectRoutes,allowTo('admin'),validation(updateTaskSchema),taskController.updateTask)
.delete(protectRoutes,allowTo("admin"),validation(deleteTaskSchema),taskController.deleteTask)

export default taskRouter;
