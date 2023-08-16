import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/UserModel.js";
import JWT from "jsonwebtoken";

export const registerController = async(req,res) => {
    try{
        const {email,password,hint} = req.body

        
        if(!email){
            return res.send({error: 'email is required'});
        }
        if(!password){
            return res.send({error: 'Password is required'});
        }
        if(!hint){
            return res.send({error: 'Hint is required'});
        }
        
        

        //exissting user
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success: true,
                message: 'Already Registered please login',
            })
        }
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({email,password:hashedPassword,hint}).save()
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

export const loginController = async(req,res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',

            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({_id: user._id},"NJNERGEORIKLEGUIWJKNFB51387DSFRG",{expiresIn: '1000d',});
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user:{
                email: user.email,
                role: user.role,
                hint: user.hint
            },
            token,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};
//test controller

export const testController = async(req,res) =>{
    res.send("Protected routes");
}



//reset password
export const resetpassword = async(req,res) => {
    try {
        const {email,hint, newPassword} = req.body;

        if(!email){
            return res.send("Please Your Email");
        }
        if(!hint){
            return res.send("Please Your Hint");
        }
        if(!newPassword){
            return res.send("Please Enter Your New Password");
        }

        //check
        const user = await userModel.findOne({email, hint})


        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message: "Wrong email or answer"
            })
        }

        const hased = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hased})
        res.status(200).send({
            success: true,
            message:" Password reset successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in reset page',
            error
        })
    }
}
