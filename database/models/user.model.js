import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, "name is to short"],
      require: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "email is required"],
      minLength: 1,
      trim: true,
      unique: [true, "email must be require"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
      minLength: 6,
    },
    phone: {
      type: String,
      required: [true, "password number required"],
    },
    adress: String,
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    birthDate: Date,
    social_status: {
      type: String,
      enum: ["single", "married"],
      default: "single",
    },
    fingerPrint: {
      type: String,
    },
    currentLocation: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save",function(){
  this.password = bcrypt.hashSync(this.password,7)
});
const userModel = mongoose.model("User",userSchema);

export default userModel;