import JWT from "jsonwebtoken";
import userModel from "../models/UserModel.js";
export const requireSignIn = async(req,res,next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            "NJNERGEORIKLEGUIWJKNFB51387DSFRG"
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
    const token = req.headers.authorization;
const decodedToken = JWT.decode(token, { complete: true });
console.log(decodedToken);

};

//admin access
export const isAdmin = async(req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: 'unAuthorized Access'
            });
        }
        else{
            next();
        }
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",

        });
    }
}

