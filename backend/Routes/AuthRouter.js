const { signUpValidation, loginValidation } = require('../Middleware/AuthValidation');
const {signup, login} =require('../Controllers/AuthControllers')

const router=require('express').Router();

router.post('/login',loginValidation,login);
router.post('/signup',signUpValidation,signup);


module.exports=router;