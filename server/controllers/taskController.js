const getTask = (req,res)=>{
    res.status(200).json({message:"Get All The Post Using a Controller"})
}

const setTask = (req,res)=>{
    console.log(req.body);
    res.status(200).json({message:"Create a new Post"});
}

const updateTask = (req,res)=>{
    res.status(200).json({message:`taskId:${req.params.id} updated successfully`})
}
const deleteTask = (req,res)=>{
    res.status(200).json({message:`task with id:${req.params.id}, has been deleted successfully`})
}

module.exports ={getTask,setTask,updateTask,deleteTask};