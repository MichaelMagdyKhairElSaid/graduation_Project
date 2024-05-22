import mongoose from 'mongoose';

const workRecordSchema = new mongoose.Schema({
  clockIn: {
    type: Date,
  },
  clockOut: {
    type: Date, 
  },
  workingHours: {
    type: String,
    validate: {
      validator: (value) => value > 0,
      message: 'Working hours must be a positive number'
    }
  },
  owner:{
    type:mongoose.Types.ObjectId,
    ref:"Employee",
    required:[true,"record owner is required"]
  },
});

const workRecordModel = mongoose.model("WorkRecord",workRecordSchema)

export default workRecordModel