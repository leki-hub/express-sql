const models = require( '../models' );
const jwt = require("jsonwebtoken");
const bcryptjs= require( "bcrypt" ) ;


function signup( req, res ){

    models.User.findOne({ where:{ email : req.body.email }}).then(user => {
        if (user) {
            res.status(409).send({message:'Email is already in use'})
        }
        else{
            bcryptjs.genSalt(10, function ( err, salt ) {
                bcryptjs.hash(req.body.password , salt, function (err,hash){
                
                    
            const  user = {
                name: req.body.name,
                email:req.body.email ,
                password: hash
            }
        
            models.User.create(user).then(result=>{
                res.status(201).send({message:"User Created successflly"});
                
            }).catch((err)=>{
                res.status(500).send({ message: "Something went wrong",
                error: err})
           
            })
            
                }) 
            })
        
        }
  
    
    })
    .catch((err)=>{
        res.status(500).send({ message: "Something went wrong",
        error: err})
   
    })
}


function login(req,res){
   const  email= req.body.email
   const pass = req.body.password;
   if(!email || !pass) return res.status(400).json({message : 'Missing data'})

   models.User.findOne({
    where:{
      email: email,password:}
   })


    }


module.exports  = {
    signup:signup,
}