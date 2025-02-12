import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/userRoute.js";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

main()
  .then((res) => {
    console.log("Database Connection Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/crud");
}

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
