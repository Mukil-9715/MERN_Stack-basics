const express = require('express')
require('dotenv').config()
const mongoose = require("mongoose")
const app = express()
const taskRoutes = require("./routes/TaskRoute")
const cors = require('cors') 

//midleware
app.use((req,res,next)=>{
    console.log('path'+req.path+'method'+req.method);
    next()
})

app.use(cors());
 
app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send("Hello world");
// })


mongoose.connect(process.env.MONGO_URL,)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("DB connected successfully"+  process.env.PORT);
    })
}).catch((error)=>{
    console.log(error);
})


app.use("/api/task", taskRoutes )
