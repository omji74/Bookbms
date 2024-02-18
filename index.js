import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import {User} from "../models/user";


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/bookmbs", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("DB connection successful");
});

const userSchema = new mongoose.Schema({
    name :String,
    email:String,
    password:String
  
}) 

const User = new mongoose.model("User",userSchema)

//Routes 

app.post("/login", (req, res) => {
  res.send("MY API login");
});
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send({ message: "User already registered" });
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});


// app.post("/register", (req, res)=> {
//     const { name, email, password} = req.body
//     User.findOne({email: email}, (err, user) => {
//         if(user){
//             res.send({message: "User already registerd"})
//         } else {
//             const user = new User({
//                 name,
//                 email,
//                 password
//             })
//             user.save(err => {
//                 if(err) {
//                     res.send(err)
//                 } else {
//                     res.send( { message: "Successfully Registered, Please login now." })
//                 }
//             })
//         }
//     })
    
// }) 

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
