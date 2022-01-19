const mongoose=require("mongoose");
const {Schema}=mongoose;
const UserSchema=new mongoose.Schema({
name:{
    type:String,
    require:true
},
email:{
    type:String,
    required:true,
    unique:true
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
const user=mongoose.model("user",UserSchema);
user.createIndexes();
module.exports=user