const models = require( '../models' );
const bcryptjs= require( "bcrypt" ) ;
const jwt = require("jsonwebtoken");

function   signup ( req, res ){
  
    const  user = {
        name: req.body.name,
        email:req.body.email ,
        password: req.body.password
    }
  

    models.User.create(user).then(result=>{
        res.status(201).send({message:"User Created successflly", data : result});
        
    }).catch((err)=>{
        res.status(500).send({ message: "Something went wrong",
        error: err})
   
    })
    

}


models.exports  = {
    signup:signup,
}