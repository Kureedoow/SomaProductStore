import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Image:{
        type:String,
        required:true
    }
},{timestamps:true})

const product = mongoose.model('product',productSchema)
export default product