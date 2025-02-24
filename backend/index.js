import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import 'dotenv/config'
import router from "./routes/userRoute.js";
import cors from "cors";
import connectDB from "./config/mongodb.js";



//app config
const port = process.env.PORT || 3000;
const app = express();
connectDB();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

//Router
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
