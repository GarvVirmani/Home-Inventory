import express from "express";
import {register,login,logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);

export default router;