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

        models.User.findOne({  where:{ email: req.body.email} }).then(user=>{
        if(user==null) {
            return res.status(401).json({message:'Email not found'})
        }
          
          bcryptjs.compare(req.body.password , user.password, function(err, result) {
              if (result) {
                const userData=jwt.sign({
                   email:user.email,
                   userId:user.id
                },"setsecretkeyfrom_env",
                function(err,token){
                    res.status(200).json(
                        {
                            message:"Logged in succesfully",
                            token:token,
                           
                    });
                }
            );
              }else{
                return res.status(401).json({message:'Password incorrect'});
            }
        }

        )
        }).catch(err=>{
            res.status(500).send({ message: "Something went wrong",
            error: err})


    


    })

}






module.exports  = {
    signup:signup,
    login:login
}