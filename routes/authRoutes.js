import express from "express";
import {registerController,loginController,testController, resetpassword} from "../controller/authController.js"
import { requireSignIn ,isAdmin} from "../middlewares/AuthMiddleware.js";

//router object

const router = express.Router()
//routing 
//REGISTER || METHOD POST

router.post('/register',registerController);

//LOGIN || POST
router.post('/login',loginController);

//test
router.get('/test',requireSignIn,isAdmin,testController);

//reset password
router.post('/reset',resetpassword)

export default router;
