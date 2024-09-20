import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.routes.js"
import path from 'path'
dotenv.config();
const app=express();
const port =process.env.PORT||5000
app.use(express.json());
const __dirname=path.resolve();

app.use('/api/products',productRoutes)
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}
app.listen(port,()=> {
    connectDB(); 
    console.log("server started at http://localhost:"+port)
})


// GaJfzIhscZhy3Vsw