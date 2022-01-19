const express=require("express");
const router=express.Router();
const { body, validationResult } = require('express-validator');

const fetchuser = require("../middleware/login");
const opportunity=require("../models/Opportunity")
const startup=require("../models/Startup")
const mongoose=require("mongoose");
const {Schema}=mongoose;


//ROUTE:1  : end point to get all the oppertunites of a particular startup /api/opportunities/getallopportunities
router.get("/getallopportunities",fetchuser,async (req,res)=>{
    try {
        const notes=await opportunity.find({user:req.user.id})
    res.json(notes); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }
  
})

//ROUTE:2  : to add opportunity for a particular user /api/opportunities/addopportunity
router.post("/addopportunity",fetchuser,[
    body('phonenumber','enter a valid title').isLength({ min: 3 }),
    body('description',"description must be atleast 5 characters").isLength({ min: 5 }),
    body('email').isEmail()

]    
,async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {position,description,lastdate,requirements, phonenumber, email,numberofpostions}=req.body;
        // console.log(req);
        let newoppertunity=new opportunity({position:position,description:description,lastdate:lastdate,company:req.user.id,requirements:requirements,phonenumber:phonenumber,email:email,numberofpostions:numberofpostions
        });
        const savedopportunity=await newoppertunity.save();   
        res.json(savedopportunity);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }
 })

 //ROUTE:3  : to update a opportunity for a particular user /api/opportunities/updateopportunity

router.put("/updateopportunity/:id",fetchuser,async (req,res)=>{


    try {
        const {position,description,lastdate,requirements, phonenumber, email,numberofpositions}=req.body;
    const newopportunity={};
    if(position){newopportunity.position=position};
    if(description){newopportunity.description=description};
    if(lastdate){newopportunity.lastdate=lastdate};
    if(requirements){newopportunity.requirements=requirements};
    if(phonenumber){newopportunity.phonenumber=phonenumber};
    if(email){newopportunity.email=email};
    if(numberofpositions){newopportunity.numberofpositions=numberofpositions};
    let requiredopportunity=await opportunity.findById(req.params.id);
    console.log(requiredopportunity);
    if(!requiredopportunity){
        res.status(404).send("Not Found");
    }
    if(req.user.id!==requiredopportunity.company.toString()){
        res.status(404).send("Not allowed");
    }
    requiredopportunity=await opportunity.findByIdAndUpdate(req.params.id,{$set:newopportunity},{new:true});
    res.send(requiredopportunity);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }

});

 //ROUTE:4  : to delete a opportunity for a particular user /api/opportunities/deleteopportunity

 router.delete("/deleteopportunity/:id",fetchuser,async (req,res)=>{

    try {
         //find the note with the provided id in the parameter or link if not found return error
    let requiredopportunity=await opportunity.findById(req.params.id);
    console.log(requiredopportunity);
    if(!requiredopportunity){
        res.status(404).send("Not Found");
    }
    //user authorizaiton whether the note of given id belong to logged in user if not return error
    if(req.user.id!==requiredopportunity.company.toString()){
        res.status(404).send("Not allowed");
    }
    requiredopportunity=await opportunity.findByIdAndDelete(req.params.id);
    res.json({"success":"Opportunity has been deleted"});
    }
     catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }


   
});


//ROUTE:5  : to get all opportunities  /api/opportunities/getallcompany

router.get("/getallcompany",async (req,res)=>{

    try {
         //find the note with the provided id in the parameter or link if not found return error
    let requiredopportunity=await opportunity.find();
    console.log(requiredopportunity);
    if(!requiredopportunity){
        res.status(404).send("Not Found");
    }
    
    // requiredopportunity=await opportunity.findByIdAndDelete(req.params.id);
    // res.json({"success":"All opportunities found"});
    res.status(200).send(requiredopportunity);
    }
     catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }


   
});
//ROUTE:6  : to get all opportunities  /api/opportunities/getallstartups

router.get("/getallstartups",async (req,res)=>{

    try {
         //find the note with the provided id in the parameter or link if not found return error
    let allstartups=await startup.find();
    console.log(allstartups);
    if(!allstartups){
        res.status(404).send("Not Found");
    }
    
    // requiredopportunity=await opportunity.findByIdAndDelete(req.params.id);
    // res.json({"success":"All opportunities found"});
    res.status(200).send(allstartups);
    }
     catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }


   
});




module.exports=router;
