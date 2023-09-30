import eventModel from "../models/eventModel.js";
import categoryModel from "../models/categoryModel.js"
import fs from 'fs'

export const createEventController = async (req, res) => {

    // console.log("sdfg")
    try {


        console.log("Eventreq", req.files)
        const { category, description } = req.fields;
        const { photo } = req.files;

        if (!category) {
            return res.status(401).send({
                message: "category is required"
            })
        }
        if (!description) {
            return res.status(401).send({
                message: "description is required"
            })
        }
        if (photo && photo.size > 1000000) {
            return res.status(401).send({
                message: "photo is required and its size is not more than 1mb"
            })
        }


        // console.log("category", category)
        const foundCategory = await categoryModel.findById({ _id: category });

        // console.log("categoryfound", foundCategory)
        if (!foundCategory) {
            return res.status(404).send({
                message: "Category not found"
            })
        }

        const events = await eventModel({
            description,
            category: foundCategory._id,
        })

        if (photo) {
            events.photo.data = fs.readFileSync(photo.path);
            events.photo.contentType = photo.type;
        }
        await events.save();
        res.status(201).send({
            success: true,
            message: "events Created Successfully",
            events,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in creating events",
            error: error.message,
        });
    }
}


//get all events
export const getEventController = async (req, res) => {
    try {
        const events = await eventModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: events.length,
            message: "All events ",
            events,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting events",
            error: error.message,
        });
    }
};


//get single event
export const getSingleEventController = async (req, res) => {
    console.log(req.params)
    try {
        const event = await eventModel
            .findOne({ _id: req.params.eid })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Event Fetched",
            event,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single event",
            error,
        });
    }
};


// get photo
export const eventPhotoController = async (req, res) => {
    try {
        console.log("eid",req.params)
        const event = await eventModel.findById(req.params.eid).select("photo");
        if (event.photo.data) {
            
            res.set("Content-type", event.photo.contentType);
            return res.status(200).send(event.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};



//delete event
export const deleteEventController = async (req, res) => {
    try {
        await eventModel.findByIdAndDelete(req.params.eid).select("-photo");
        res.status(200).send({
            success: true,
            message: "events Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting event",
            error,
        });
    }
};



//upate event
//upate event
/*export const updateEventsController = async (req, res) => {
    console.log("update")
    console.log(req.body);
    try {
        const { description, category } = req.fields;
         const { photo } = req.files;
        //alidation
        switch (true) {
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        // Find the category by name
        const foundCategory = await categoryModel.findById({ _id: category });

        if (!foundCategory) {
            return res.status(404).send({ error: "Category not found" });
        }
        
        const events = await eventModel.findByIdAndUpdate(
            req.params.eid,
            { ...req.body, category: foundCategory._id },
            { new: true }
        );
        if (photo) {
            events.photo.data = fs.readFileSync(photo.path);
            events.photo.contentType = photo.type;
        }
        await events.save();
        res.status(201).send({
            success: true,
            message: "event Updated Successfully",
            events,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte event",
        });
    }
};*/
