import express from "express";
import { createItem,getUserItems,getItemById,updateItem,deleteItem } from "../controllers/item.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.post("/create",isAuthenticated,createItem);
router.get("/user",isAuthenticated,getUserItems);
router.get("/:id",isAuthenticated,getItemById);
router.put("/update/:id",isAuthenticated,updateItem);
router.delete("/delete/:id",isAuthenticated,deleteItem);

export default router;