import express from "express"
import cors from "cors"

const app =  express()
const port = 4000;
import connectDB from './config/db.js';
import foodRouter from "./routes/foodRoutes.js";

app.use(express.json())
app.use(cors())

connectDB();

app.get("/", (req, res)=>{
    res.send("API Working")
})

app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'))

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});

// mongodb+srv://gourangiacc2:159625@cluster0.klzxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0