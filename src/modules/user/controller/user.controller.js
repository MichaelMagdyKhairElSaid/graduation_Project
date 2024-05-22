import userModel from "../../../../Db/models/user.model.js";
import catchAsyncError from "../../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../../utils/middleware/handler/refactor.handler.js";
import AppError from "../../../utils/services/AppError.js";

export const addUser = catchAsyncError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("Duplicated Email", 409));
  let results = new userModel(req.body);
  let add = await results.save();
  res.status(201).json({ messsage: "Added", add });
});
export const getAllUsers = async (req, res) => {
  let user = await userModel.find({});
  res.json({ message: "Done", user });
};
export const getUserById = catchAsyncError(async (req, res, next) => {
    let { _id } = req.params;
    let user = await userModel.findById(_id);
    res.json({ messsage: "done", user });
  });
export const editUser = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let user = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
  !user && next(new AppError("Not Found User", 404));
  user && res.json({ message: "Updated", user });
});

export const deleteUser = deleteOne(userModel);
