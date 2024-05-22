import taskModel from "../../../../Db/models/task.model.js"
import userModel from "../../../../Db/models/user.model.js";
import  catchAsyncError  from '../../../utils/middleware/catchAsyncError.js'
import  AppError  from "../../../utils/services/AppError.js";


//add task
export const addTask = catchAsyncError(async (req, res,next) => {

    req.body.userID = req.user.id
    const assignTo = await userModel.findById(req.body.assignTo)
    if (!assignTo) {
        next(new AppError(`User you want to assign this task not exist`,404))
    }

    const startDate = new Date(req.body.startdate);
    const endDate = new Date(req.body.enddate);

    if (startDate >= endDate) {
        return res.status(400).json({ message: "End date must be after start date" });
    }

    const task = await taskModel.create(req.body)
    return res.json({ message: "Done", task })

});



//update task
export const updateTask = catchAsyncError(async (req, res,next) => {

    let { _id } = req.params;
    let { title, description } = req.body;
    let findTask = await taskModel.findById(_id)
    if (!findTask) {
        next(new AppError(`task not exist`,404))
    }
    if (req.body.userId.toString() != req.user._id) {
        next(new AppError(`You not allow to update this task`,401))
    }
    const assignTo = await userModel.findById(req.body.assignTo)
    if (!assignTo) {
        next(new AppError(`User you want to assign this task not exist`,404))
    }

    const startDate = new Date(req.body.startdate);
    const endDate = new Date(req.body.enddate);

    if (startDate >= endDate) {
        return res.status(400).json({ message: "End date must be after start date" });
    }

    const task = await taskModel.findByIdAndUpdate(_id, { title, description })
    return res.json({ message: "Task updated successfully", task })

});
// delete task
export const deleteTask =catchAsyncError( async (req, res,next) => {
    let { _id } = req.params;

    let findTask = await taskModel.findById(_id)
    if (!findTask) {
        next(new AppError(`task not exist`,404))
    }
    if (req.body.userId.toString() != req.user._id) {
        next(new AppError(`You not allow to update this task`,401))
    }
    const assign = await userModel.findById(req.body.assignTo)
    if (!assign) {
        next(new AppError(`User you want to assign this task not exist`,404))
    }

    const startDate = new Date(req.body.startdate);
    const endDate = new Date(req.body.enddate);

    if (startDate >= endDate) {
        return res.status(400).json({ message: "End date must be after start date" });
    }

    const task = await taskModel.findByIdAndDelete(_id)
    return res.json({ message: "Task deleted successfully", task })

});

// getall tasks with user data 
export const getAllTasks = catchAsyncError(async(req,res)=>{
    let task = await taskModel.find({}).populate([
        {
            path:'assignTo',
            select:'name email '
        }
    ])
    res.json({ message: "founded", task })
})

 


//get tasks of oneUser 
export const getAllTasksOfUser = catchAsyncError(async (req, res,next) => {
let userId = req.params
    let foundUser = await userModel.findById(userId);
    if(!foundUser){
        next(new AppError("User no exist",404))
    }
    let task = await taskModel.find({ assignTo: userId })
    res.json({messaeg:"user tasks founded",task})
});


