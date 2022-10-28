const mongoose = require("mongoose")

const userRegisterSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    },
    AadharNo:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },

},{timestamps:true})

module.exports = mongoose.model("UserRegist",userRegisterSchema)