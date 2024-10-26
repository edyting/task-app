const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel")

// get all task
const getTask = asyncHandler(async (req,res)=>{
    const tasks = await Task.find({user:req.user.id});
    res.status(200).json(tasks);
})

// add task
const setTask = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please enter a task')
    }
    const task = await Task.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json({task});
    
})

// update task
const updateTask = asyncHandler(async (req,res)=>{
    const user = await Task.findById(req.user.id);
    const task = await Task.findById(req.params.id);

    if(!user){
        res.status(401);
        throw new Error("No such user found")
    }

    if(task.user.toString() !== user.id){
        res.status(401);
        throw new Error("user not authorized to update")
    }
    
    if(!task){
        res.status(400)
        throw new Error("Task not found")
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedTask)
})

// delete task
const deleteTask = asyncHandler(async (req,res)=>{
    const user = await Task.findById(req.user.id);
    const task = await Task.findById(req.params.id);

    if(!user){
        res.status(401);
        throw new Error("No such user found")
    }

    if(task.user.toString() !== user.id){
        res.status(401);
        throw new Error("user not authorized to delete")
    }

    if(!task){
        res.status(400)
        throw new Error("Task not found")
    }

    await Task.findByIdAndDelete(req.params.id)
    
    res.status(200).json({id:req.params.id})
})

module.exports ={getTask,setTask,updateTask,deleteTask};