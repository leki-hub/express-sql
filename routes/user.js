const express = require( 'express' );
const userController =  require('../controllers/user.controller')
const app = express()
const router = express.Router();

router.post('/sign-up', userController.signup) 
router.post('/login', userController.login )

module.exports = router