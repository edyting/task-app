const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel")

// get all task
const getTask = asyncHandler(async (req,res)=>{
    const tasks = await Task.find();
    res.status(200).json(tasks);
})

// add task
const setTask = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please enter a task')
    }
    const task = await Task.create({
        text:req.body.text
    })
    res.status(200).json({task});
    
})

const updateTask = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`taskId:${req.params.id} updated successfully`})
})

const deleteTask = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`task with id:${req.params.id}, has been deleted successfully`})
})

module.exports ={getTask,setTask,updateTask,deleteTask};