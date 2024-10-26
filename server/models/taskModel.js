const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        text:{
            type:String,
            required:[true,"please add a text"]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Task",taskSchema);