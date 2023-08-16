import express from "express";
import {contactController} from "../controller/contactController.js"
import { getClientMessageController } from "../controller/contactController.js";

//router object

const router = express.Router()
//routing 
//REGISTER || METHOD POST

router.post('/contact',contactController);
router.get('/getContactInfo',getClientMessageController);
export default router;