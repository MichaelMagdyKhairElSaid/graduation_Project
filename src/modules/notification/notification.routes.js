import express from 'express';
import * as notifiController from './controller/notification.controller.js'
import { allowTo, protectRoutes } from '../auth/auth.controller.js';
const notificationRouter = express.Router();


notificationRouter.
route("/")
.get(notifiController.getAllNotification)
.post(protectRoutes,allowTo("admin"),notifiController.sendNotification);

notificationRouter.
route("/:_id")
.get(notifiController.getEmployeeNotification)
.delete(protectRoutes,allowTo("admin"),notifiController.deleteNotification);

export default notificationRouter;