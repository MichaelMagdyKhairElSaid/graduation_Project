import notificationModel from "../../../../Db/models/notification.model.js";
import taskModel from "../../../../Db/models/task.model.js";
import userModel from "../../../../Db/models/user.model.js";
import catchAsyncError from "../../../utils/middleware/catchAsyncError.js";
import AppError from "../../../utils/services/AppError.js";

export const getAllNotification = catchAsyncError(async (req, res, next) => {
  const notifi = await notificationModel.find({}).populate([
    {
      path:"assignTo",
      select:"name email"
    },
    {
      path:"taskId",
      select:"title"
    }
  ])
  res.json({ message: "Founded", notifi });
});

export const sendNotification = catchAsyncError(async (req, res, next) => {
  let assignTo = await userModel.findById(req.body.assignTo);
  if (!assignTo)
    return next(new AppError("User Not Exist To Send Notification", 404));
  let taskExist = await taskModel.findById(req.body.taskId);
  if (!taskExist) return next(new AppError("Task Not Found ", 404));
  let results = new notificationModel(req.body);
  let send = await results.save();
  res.status(201).json({ messsage: "Notification Sent", send });
});

export const deleteNotification = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let findNotifi = await notificationModel.findById(_id);
  if (!findNotifi) return next(new AppError(`No Notification To Delete `, 404));
  let assignTo = await userModel.findById(req.body.assignTo);
  if (!assignTo)
    return next(
      new AppError(`User you want to delete his notification not exist`, 404)
    );
  let deleteNotifi = await notificationModel.findByIdAndDelete(_id);
 return res.json({ message: "Notification Deleted ", deleteNotifi });
});


export const getEmployeeNotification = catchAsyncError(async (req, res, next) => {
  let employeeId = req.params
  let foundUser = await userModel.findById(employeeId);
  if(!foundUser){
      next(new AppError("Employee not exist",404))
  }
  let notifi = await notificationModel.find({ assignTo: employeeId })
  res.json({messaeg:"Employee Notifications Founded",notifi})
});