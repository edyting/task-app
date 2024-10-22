const express = require("express");
const dotenv = require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// middleware before routes
app.use("/api/tasks/",require("./routes/taskRoutes"));

app.listen(port,()=>{
    console.log(`listening on port ${port}...`)
})