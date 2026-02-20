
import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controller/socketManager.js"
import userRoutes from "./routes/usersRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const io= connectToSocket(server);


app.set("port",(process.env.PORT || 8000))


app.use(cors());
app.use(express.json ({limit:"40kb"}));
app.use(express.urlencoded({limit : "40kb" , extended :true}));

app.use("/api/v1/users", userRoutes);


const start= async()=>{app.set("mongo_user")
const connectionDb = await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to db");
try{
    server.listen(app.get("port"),()=>{
    console.log("Listening on port 8000");
   
});
}
 catch(err){console.log(err)};
}
start();