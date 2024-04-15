const express = require( 'express' );
const postController = require('../controllers/post.controller');
const router = express.Router()

 router.post('/', postController.savePost)
 router.get('/:id', postController.show)
 router.get('/', postController.index)
 router.patch('/:id', postController.updatePost)
 router.delete('/:id', postController.delete)

 module.exports = router;