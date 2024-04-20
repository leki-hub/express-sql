const express = require( 'express' );
const postController = require('../controllers/post.controller');
const checkAuthMiddleware  = require("../middleware/check-auth");
const router = express.Router()

 router.post('/',checkAuthMiddleware.checkAuth, postController.savePost)
 router.get('/:id', postController.show)
 router.get('/', postController.index)
 router.patch('/:id',checkAuthMiddleware.checkAuth, postController.updatePost)
 router.delete('/:id',checkAuthMiddleware.checkAuth, postController.delete)

 module.exports = router;