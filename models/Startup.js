const mongoose=require("mongoose");
const {Schema}=mongoose;
const StartupSchema=new mongoose.Schema({
name:{
    type:String,
    require:true
},
email:{
    type:String,
    required:true,
    unique:true
},
description:{
    type:String,
    required:true
},
datestarted:{
type:String,
required:true
},
logo:{
type:String,
required:true
},
phonenumber:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}

})
const startup=mongoose.model("startup",StartupSchema);
startup.createIndexes();
module.exports=startup