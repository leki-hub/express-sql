const models = require('../models');
const Validator = require('fastest-validator')
const v = new Validator()


function save(req, res) {
    const post= {
        title: req.body.title,
        content: req.body.content,
        imageUrl:req.body.image_url,
        categoryId:req.body.category_id,
        userId: 1
    }
    const validationSchema =  {
        title :{ type: "string", max:100 , optional:false },
        content:{type:"string",min:10, optional:false, message: 'Content is required.'},
        categoryId:{type:'number', min:"3", message: 'Category id must be a number and should not be empty'},
        imageUrl:{type:"string",optional:false,message: 'Image url is required'}
     }
     const check =v.validate(post,validationSchema);
     if (check !== true) {
        return res.status(400).send({
            message:"ValidationError",
            errors: check})
     } 
 

    models.Post.create(post).then(result  =>{
        res.status(201).json({
            message:'Post created successully',
            post:result
        
        })
    })
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

    const validationSchema =  {
        title :{ type: "string", max:100 , optional:false },
        content:{type:"string",min:10, optional:false, message: 'Content is required.'},
        categoryId:{type:'number', min:"3", message: 'Category id must be a number and should not be empty'},
        imageUrl:{type:"string",optional:false,message: 'Image url is required'}
     }
     const check =v.validate(updatedPost,validationSchema);
     if (check !== true) {
        return res.status(400).send({
            message:"ValidationError",
            errors: check})
     } 



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


function destroy(req,res){
    const  id =req.params.id;
    const userId =req.body.user_id;



    models.Post.destroy({where:{id:id, userId:userId}})

    .then(result  => {
       res.status(200).json(
        {
           message :"Data deleted successfully" ,
           post:result
        }
       )
    }).catch((error)=> {
        res.status(400).json({message:"Failed to Delete the Post",
        error:error})
    })
}


module.exports= {
    savePost:save,
    show:show,
    index:showAll,
    updatePost:update,
    delete:destroy
}