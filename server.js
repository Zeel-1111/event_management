import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import eventRoutes from "./routes/eventRoutes.js";
import categoryRoute from "./routes/categoryRoute.js"
import cors from "cors";
//configure env
dotenv.config();

//database config
connectDB();


//rest object
const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/contact',contactRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/event', eventRoutes);

app.get('/',(req,res) => {
    res.send("<h1>Welcome to MERN stack project</h1>")
});

const PORT = 8000;

app.listen(PORT,() => {
    console.log(`Server running on ${process.env.DEV_MODE} ${PORT}`.bgCyan.white);
});