import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    hint: {
        type: String,
        required: true,
    },
    role:{
        type: Number,
        default: 0
    }
},{timestamps: true}
);

export default mongoose.model('login',userSchema);