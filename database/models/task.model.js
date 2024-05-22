
import mongoose, { Types } from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,, "Task title required" ],
        trim:true,
        minlength:[4,"Too short task title"] //shortest title --> Task
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:[10,"Too short description"]
    },
    startDate:{
        type:Date,
        required:[true,"Start date required"]
    },
    endDate:{
        type:Date,
        required:[true,"End date required"]
    },
    owner:{
        type:Types.ObjectId,
        ref:'Employee',
        required:[true,"Task owner ID required"]
    },
    assignTo:{
        type:Types.ObjectId,
        ref:'Employee',
        required:[true,"AssignTo ID required"],
    },
    //added by michael
    status:{ 
        type:String,
        required:true,
        enum:["pending","done"],
        default:"pending"
    },
    photos:{
    type:Object
    }
},{timestamps:true});

export default taskModel;