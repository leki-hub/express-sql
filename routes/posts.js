const express = require( 'express' );
const postController = require('../controllers/post.controller');
const router = express.Router()

 router.post('/', postController.savePost)

 module.exports = router;