import express from 'express';
import cors from 'cors';
import dbConnection from './database/db_connection.js';
import userModel from './database/models/user.model.js';
import { configDotenv } from 'dotenv';
import authRouter from './src/modules/auth/auth.routes.js';
import requestRouter from './src/modules/request/request.routes.js';
import taskRouter from './src/modules/tasks/task.routes.js';
import notificationRouter from './src/modules/notification/notification.routes.js';
import alertRouter from './src/modules/alert/alert.routes.js';
const app = express();
const port = 3000;

configDotenv(); // Add this line to configure dotenv

dbConnection();
app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({extended:true})) // to parse form data

app.use("/api/v1/employee",userModel)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/request",requestRouter)
app.use("/api/v1/task",taskRouter)
app.use("/api/v1/notification",notificationRouter)
app.use("/api/v1/alert",alertRouter)


app.listen( port , () => {
    console.log(`server is running on port ${port}`);
});
