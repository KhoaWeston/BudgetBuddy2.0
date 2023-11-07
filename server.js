import express from "express";
import cors from "cors";  
import mongoose from "mongoose"; 
import connectDB from "./config/db.js";

import Route from "./routes/Route.js";

connectDB();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use("/test", Route);