// Importing packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"

// Importing Routes
import authRoutes from "./routes/authroutes.js"
import messageRoutes from "./routes/messageroutes.js"
import userRoutes from "./routes/userRoutes.js"

// Connect to Database
import connectToMongoDB from './db/connectMongo.js';

// Sockets
import { server } from "./sockets/socket.js"

// Middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
const port = process.env.PORT

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// To parse the incoming resource with JSON
app.use(express.json());
app.use(cookieParser());

// Using the routes defined
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

// Listening to the port
server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server's running on port ${port}`);
})