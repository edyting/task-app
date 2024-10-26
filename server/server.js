const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler}=require("./middlewares/errorHandler");
const { connectDB} = require("./connect/database")

connectDB();
const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorHandler);

// middleware before routes
app.use("/api/tasks/",require("./routes/taskRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.listen(port,()=>{
    console.log(`listening on port ${port}...`)
})