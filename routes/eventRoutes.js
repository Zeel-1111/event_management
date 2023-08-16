import express from "express"
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import { createEventController, deleteEventController, eventPhotoController, getEventController, getSingleEventController,updateEventsController } from "../controller/eventController.js";


const router = express.Router();

//router
router.post('/create-event', formidable(), createEventController);

//get all events
router.get('/get-event', getEventController);

//get single event
router.get('/get-single-event/:eid', getSingleEventController);

//get event photo
router.get('/get-event-photo/:eid', eventPhotoController);


//delete event
router.delete('/delete-event/:eid', deleteEventController)


//update event
// router.post('/update-events/:eid',formidable(), updateEventsController)

//router
router.put('/update-event/:eid', formidable(), updateEventsController);


export default router;

