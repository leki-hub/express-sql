const models = require('../models');

function save(req, res) {
    const post= {
        title: req.body.title,
        content: req.body.content,
        imageUrl:req.body.image_url,
        categoryId:req.body.category_id,
        userId: 1
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
    models.Post.findByPk(id)
     .then( (result)=> {
        res.status(200).json(result);
     }).catch((err)=>{
        res.status(500).json({message:"The Post with the given ID was not found."
       ,error:err
    });
     })
    

}

function showAll(req ,res) {
    models.Post.findAll()
    .then(results=>{
        res.status(200).json(results)
    })
    .catch((err)=>{
        return res.status(500).json({
          message : 'Error getting posts',
          error:err
         })
    })
}

function update(req,res){
    const  id =req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl:req.body.image_url,
        categoryId:req.body.category_id,
       
    }
    const userId =1;
    models.Post.update(updatedPost,{where:{id:id, userId:userId}})

    .then(result  => {
       res.status(200).json(
        {
           message :"Updated successfully" ,
           post:result

        }
       )
    }).catch((error)=> {
        res.status(400).json({message:"Failed to update the Post",
        error:error})
    })
}



module.exports= {
    savePost:save,
    show:show,
    index:showAll,
    updatePost:update
}