import express from "express";
import {
  Createuser,
  DeleteUser,
  ReadUser,
  UpdateUser,
  GetOne,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", Createuser);
router.get("/read", ReadUser);
router.get("/getone/:id", GetOne);
router.put("/update/:id", UpdateUser);
router.delete("/delete/:id", DeleteUser);

export default router;
