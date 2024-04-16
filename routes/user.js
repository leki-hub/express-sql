const express = require( 'express' );
const userController =  require('../controllers/user.controller')
const app = express()
const router = express.Router();

router.post('/sign-up', userController.signup) 

module.exports = router