const models = require('../models');

function save(req, res) {
    const post= {
        title: req.body.title,
        content: req.body.content,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId,
        userID: req.body.userID

    }
    models.Post.create(post).then(result  =>{
        res.status(201).json({
            message:'Post created successully',
            post:result
        
        })
    }

    )
        .catch((err)=>{
            res.status(500).json({
                message:'Something went wrong',
                error:err})
        })
       

}

function  show(req,res){
    const  id =req.params.id;
    models.Post.findOne({where:{id:id}})
     .then( (post)=> {
        res.status(200).json(post);
     }).catch((error)=>{
        res.status(404).json({message:"The Post with the given ID was not found."});
     })
    

}





module.exports= {
    savePost:save
}