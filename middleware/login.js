const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY='garryisagoodb$oy';

const fetchuser=(req,res,next)=>{
    //get the user from the JWT token and add id to req obj
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET_KEY);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"});
        
    }
 
}
module.exports=fetchuser;