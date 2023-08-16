import contactModel from "../models/contactModel.js";


export const contactController = async(req,res) => {
    try{
        const {fname,lname,email,phone,message} = req.body

        if(!fname){
            return res.send({error: 'fname is required'});
        }
        if(!lname){
            return res.send({error: 'lname is required'});
        }
        if(!email){
            return res.send({error: 'email is required'});
        }
        if(!phone){
            return res.send({error: 'Phone is required'});
        }
        if(!message){
            return res.send({error: 'message is required'});
        }
        
        

        //exissting user
        
        //save
        const user = await new contactModel({fname,lname,email,phone,message}).save()
        res.status(200).send({
            success : true,
            message : 'User registered Successfully',
            user,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error
        });
    }
};

//get all client message

export const getClientMessageController = async (req,res) =>{
    try {
        const contact = await contactModel.find({});
        res.status(200).send({
            success: true,
            message : "successful",
            contact
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message:"Error in retrieval",
            error,
    });

    }
}