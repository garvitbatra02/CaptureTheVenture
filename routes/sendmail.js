
var nodemailer = require('nodemailer');
const express=require('express');
const router=express.Router();


router.post("/",async (req,res)=>{
    const {name,title,description}=req.body;
    const message =`Hey this is ${name} ,${description}`
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'garrybt1610@gmail.com',
              pass: '!Ramprakash123'
            }
          });
          
          var mailOptions = {
            from: 'garrybt1610@gmail.com',
            to: 'gbatra145@gmail.com',
            subject:title,
            text: message
          };
      
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send(`Email sent to Garvit Batra`)
            }
          });
    } catch (error) {
         console.error(error.message);
        res.status(500).send('some error occured');
    }
})

module.exports=router;