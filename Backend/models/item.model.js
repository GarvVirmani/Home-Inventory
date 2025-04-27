import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    owner:{
        type:String,
        unique:true,
        required:true
    },
    productType:{
        type:String,
        enum:["Electronics","Furniture","Clothing","Appliances","Books","Others"],
        required: true
    },
    productName:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    condition:{
        type:String,
        enum:["New","Like New","Used","Refurbished"],
        default:"New"
    }
},{timestamps:true});

export const Item=mongoose.model('Item',itemSchema);