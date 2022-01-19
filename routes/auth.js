const express=require("express");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router=express.Router();
const jwt = require('jsonwebtoken');
const user=require('../models/User');
const fetchuser = require("../middleware/login");
// const user = require("../models/User");
const JWT_SECRET_KEY='garryisagoodb$oy';
const startup=require('../models/Startup');

// Route:1
router.post ("/",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),
    body('phonenumber').isLength({min:10})
    //if there is a error then it will throw error
 ],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // try to find a existing user with same email if there just throw error
    try{
       let newuser= await user.findOne({email:req.body.email});
       if(newuser){
          success=false;
          return res.status(400).json({success,error:"a user with this email already exists"});
       }
       
       // password security purpose salt and hash generator
 
       const salt=await bcrypt.genSalt(10);
       let secPass= await bcrypt.hash(req.body.password,salt);
 
 
 
 //token authorization
 data={
    user:{
       id:user.id
    }
 }
 success=true;
 const token = jwt.sign(data, JWT_SECRET_KEY);
 res.status(200).json({success,token})
 
 
 
 
       //this will create a user and save it automatically thats why await is used
 
     const newobjuser= await user.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
          phonenumber:req.body.phonenumber
        })
       
      //  res.status(200).send(newobjuser)
    }
    catch(error){
       console.error(error.message);
       res.status(500).send('some error occured');
    }
 })
 


//Route 2:signup for startup
 router.post ("/startup",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),
    body('phonenumber').isLength({min:10}),
    body('description').isLength({min:100})
    //if there is a error then it will throw error
 ],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // try to find a existing user with same email if there just throw error
    try{
       let newuser= await startup.findOne({email:req.body.email});
       let newusername=await startup.findOne({name:req.body.name});
       if(newuser){
          success=false;
          return res.status(400).json({success,error:"a startup with this email already exists"});
       }
       if(newusername){
        success=false;
        return res.status(400).json({success,error:"a startup with this name already exists"});
     }
       // password security purpose salt and hash generator
 
       const salt=await bcrypt.genSalt(10);
       let secPass= await bcrypt.hash(req.body.password,salt);
 
 
 
 //token authorization
 data={
    user:{
       id:startup.id
    }
 }
 success=true;
 const token = jwt.sign(data, JWT_SECRET_KEY);
 res.json({success,token})
 
 
 
 
       //this will create a user and save it automatically thats why await is used
 
     const newobjuser= await startup.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
          phonenumber:req.body.phonenumber,
          description:req.body.description,
          datestarted:req.body.datestarted,
          logo:req.body.logo
        })
       
      //  res.send(newobjuser)
    }
    catch(error){
       console.error(error.message);
       res.status(500).send('some error occured');
    }
 })


 
//ROUTE3 login for user
//new endpoint TO authenticate a user using POST:"/api/auth/login",No login required
router.post ("/login",[
   body('email','Enter a valid email').isEmail(),body('password','Password cannot be blank').exists()],async (req,res)=>{
      //handling validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //object destructuring done to avoid writing dot dot and all
      const {email,password}=req.body;
      try{
         //check if email already exists or not if not send error
         let success=false;
         let newuser=await user.findOne({email});
         if(!newuser){
            success=false
            res.status(400).json({success,error:"Sorry try to login with correct credentials"});
         }
         //compare password if matches show data otherwise send error
         const passwordCompare= await bcrypt.compare(password,newuser.password);
         if(!passwordCompare){
            success=false
            res.status(400).json({success,error:"Sorry try to login with correct credentials"});
         }
         data={
            user:{
               id:newuser.id
            }
         }
         const token = jwt.sign(data, JWT_SECRET_KEY);
         success=true;
         res.json({success,token});
      }
      
      catch(error){
         console.error(error.message);
         res.status(500).send('Internal server error occured');
      }
   })


//ROUTE4:login for startup
//new endpoint TO authenticate a startup using POST:"/api/auth/login/startup",No login required
router.post ("/login/startup",[
   body('email','Enter a valid email').isEmail(),body('password','Password cannot be blank').exists()],async (req,res)=>{
      //handling validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //object destructuring done to avoid writing dot dot and all
      const {email,password}=req.body;
      try{
         //check if email already exists or not if not send error
         let success=false;
         let newuser=await startup.findOne({email});
         if(!newuser){
            success=false
            res.status(400).json({success,error:"Sorry try to login with correct credentials"});
         }
         //compare password if matches show data otherwise send error
         const passwordCompare= await bcrypt.compare(password,newuser.password);
         if(!passwordCompare){
            success=false
            res.status(400).json({success,error:"Sorry try to login with correct credentials"});
         }
         data={
            user:{
               id:newuser.id
            }
         }
         const token = jwt.sign(data, JWT_SECRET_KEY);
         success=true;
         res.json({success,token});
      }
      
      catch(error){
         console.error(error.message);
         res.status(500).send('Internal server error occured');
      }
   })

 //ROUTE:5  Get logged in user details using :POST "/api/auth/getuser".login required

 router.get ("/getuser",fetchuser,async (req,res)=>{
          
           
   try {
      const userid=req.user.id;
      const newuser=await user.findById(userid).select("-password");
      res.send(newuser)
   } catch (error) {   
      console.error(error.message);
      res.status(500).send('Internal server error occured');
   }

});

 //ROUTE:6  Get logged in user details using :POST "/api/auth/getuser".login required

 router.get ("/getstartup",fetchuser,async (req,res)=>{
          
           
   try {
      const userid=req.user.id;
      const newuser=await startup.findById(userid).select("-password");
      res.send(newuser)
   } catch (error) {   
      console.error(error.message);
      res.status(500).send('Internal server error occured');
   }

});










module.exports=router;
