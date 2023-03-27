import express from "express";
import { getAllUser,login,signup, getUser } from "../controllers/usercontroller";
const router=express.Router();

router.get("/:id",getUser);
router.get("/",getAllUser);
router.post("/signup",signup);
router.post("/login",login);

export default router;

//get=return something without user input
//post=input->return
//put=update
//delete
