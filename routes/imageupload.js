const express=require('express');
const router=express.Router();
const {upload,uploadImage}=require("../controller/usercontroller");


router.post("/",uploadImage,upload);


//route to upload the file
module.exports=router;