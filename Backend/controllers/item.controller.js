import { Item } from "../models/item.model.js";
import { User } from "../models/user.model.js";

export const createItem=async(req,res)=>{
  try{
    const {productType,productName,totalPrice,quantity,purchaseDate,condition}=req.body;
    if(!productType || !productName || !totalPrice || !quantity || !purchaseDate || !condition){
      return res.status(400).json({
        message:"All fields are required.",
        success:false,
      });
    }

    const user=await User.findOne({username:req.username});
    if(!user){
      return res.status(404).json({
        message:"User not found.",
        success:false,
      });
    }
    const item=await Item.findOne({productName:req.body.productName,owner:user.username});
    console.log(item,req.body.productName);
    if(item){
      return res.status(404).json({
        message:"Item with this Product Name already exists.",
        success:false,
      });
    }
    const newItem=new Item({
      owner:user.username,
      productType,
      productName,
      totalPrice,
      quantity,
      purchaseDate,
      condition,
    });
    await Item.insertOne(newItem);

    return res.status(201).json({
      message:"Item created successfully.",
      item:newItem,
      success:true,
    });
  }
  catch(error){
    console.error("Error creating item:",error);
    return res.status(500).json({
      message:"Internal server error.",
      success:false,
    });
  }
};

export const getUserItems=async(req,res)=>{
  try {
    const items=await Item.find({owner:req.username});
    if(!items || items.length===0){
      return res.status(404).json({
        message:"No items found for this user.",
        success:false,
      });
    }

    return res.status(200).json({
      message:"Items fetched successfully.",
      items,
      success:true,
    });
  }
  catch(error){
    console.error("Error fetching items:",error);
    return res.status(500).json({
      message:"Internal server error.",
      success:false,
    });
  }
};

export const getItemById=async(req,res)=>{
  try{
    const item=await Item.find({productName:req.params.id,owner:req.username});
    if(!item){
      return res.status(404).json({
        message:"Item not found.",
        success:false,
      });
    }

    return res.status(200).json({
      message:"Item fetched successfully.",
      item,
      success:true,
    });
  }
  catch(error){
    console.error("Error fetching item:",error);
    return res.status(500).json({
      message:"Internal server error.",
      success:false,
    });
  }
};

export const updateItem=async(req,res)=>{
  try{
    const {productType,productName,totalPrice,quantity,purchaseDate,condition}=req.body;
    const item=await Item.findOne({productName:req.params.id,owner:req.username});
    if(!item){
      return res.status(404).json({
        message:"Item not found.",
        success:false,
      });
    }
    if(item.owner.toString()!==req.username){
      return res.status(403).json({
        message:"You are not authorized to update this item.",
        success:false,
      });
    }

    item.productType=productType || item.productType;
    item.productName=productName || item.productName;
    item.totalPrice=totalPrice || item.totalPrice;
    item.quantity=quantity || item.quantity;
    item.purchaseDate=purchaseDate || item.purchaseDate;
    item.condition=condition || item.condition;

    await item.save();

    return res.status(200).json({
      message:"Item updated successfully.",
      item,
      success:true,
    });
  }
  catch(error){
    console.error("Error updating item:",error);
    return res.status(500).json({
      message:"Internal server error.",
      success:false,
    });
  }
};

export const deleteItem=async(req,res)=>{
  try{
    const item=await Item.findById(req.params.id);

    if(!item){
      return res.status(404).json({
        message:"Item not found.",
        success:false,
      });
    }

    if(item.owner.toString()!==req.username){
      return res.status(403).json({
        message:"You are not authorized to delete this item.",
        success:false,
      });
    }

    await Item.deleteOne({_id:req.params.id});

    return res.status(200).json({
      message:"Item deleted successfully.",
      success:true,
    });
  }
  catch(error){
    console.error("Error deleting item:",error);
    return res.status(500).json({
      message:"Internal server error.",
      success:false,
    });
  }
};