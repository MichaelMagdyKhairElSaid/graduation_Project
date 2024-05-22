import employeeModel from "../../../database/models/employee.model.js";
import deleteOne from "../../utils/handler/refactor.handler.js";
import  catchAsyncError  from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";

export const addUser = catchAsyncError(async (req, res, next) => {
  //find if email is already exist
    let user = await employeeModel.findOne({ email: req.body.email });
    if (user) return next(new AppError("Duplicated Email", 409));
    
    //save to database
    let results = new employeeModel(req.body);
    let add = await results.save();
    res.status(201).json({message: "Added", add });
  });

  export const getAllUsers =catchAsyncError( async (req, res) => {
   const result = await employeeModel.find();
    res.json({message:"Done",result});
  })

  export const getUserById = catchAsyncError(async (req, res, next) => {
      let { _id } = req.params;
      let user = await employeeModel.findById(_id);
      res.json({message: "Done", user });
    });

  export const editUser = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
   const findUser = await employeeModel.findById(id);
    findUser && next(new AppError("Employee not found", 404));
    let user = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });
    !user && next(new AppError("Employee not found", 404));
    user && res.json({message: "Done", user });
  });
  
  export const deleteUser = deleteOne(employeeModel);

