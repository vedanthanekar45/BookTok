import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import authRoutes from "./routes/authroutes.js"
import messageRoutes from "./routes/messageroutes.js"
import userRoutes from "./routes/userRoutes.js"

import connectToMongoDB from './db/connectMongo.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const port = process.env.PORT

// To parse the incoming resource with JSON
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)  => {
    // route handler for http://localhost:5000
    res.send("Server is running")
})

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server's running on port ${port}`);
})