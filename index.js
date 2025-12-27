// const express= require("express");//importing all libraries
// const fs = require("fs");
// const path = require("path");
// const app= express();
// app.use(express.json());//parse JSON request bodies
// app.use(express.urlencoded({ extended: false }));// this have the body data and just add it to req.body
// const port = 8000;
// const users= require("./MOCK_DATA.json");

// app.use((req,res,next)=>{//user defined middlewares
//     console.log("First middleware");
//     next();
// })


// app.get("/",(req,res)=>{
//     console.log("Someone started server");
//     return res.send("Welcome to Homepage");
// })

// app.route("/users").get((req,res)=>{
//     console.log("User data is fatched");
//     return res.json(users);
// }).delete((req,res)=>{
//     return users.pop();
// }).put((req,res)=>{
//      return res.json("Pending ");
// }).post((req,res)=>{
//     const body = req.body;
//     const newUser = { ...body, id: users.length + 1 };
//     users.push(newUser);
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             console.log("Error writing file:", err);
//             return res.json("File write failed");
//         }
//         return res.status(201).json("User added");
//     });
// })


// app.get("/users/:id",(req,res)=>{
//     const id= Number(req.params.id);
//     const user= users.find((user)=>{
//         return user.id === id;
//     })
//     console.log(`user with id ${id} is fatched`);
//     if(!user)res.status(404).json("No such user exists");
//     return res.json(user);
// })

// app.listen(port,()=>{//starting server
//     console.log("Server started");
// })

const express= require("express");//importing all libraries
const app= express();
const port = 8000;
const mongoose = require("mongoose");
app.use(express.json());//parse JSON request bodies
app.use(express.urlencoded({ extended: false }));// this have the body data and just add it to req.body

//connection
mongoose.connect("mongodb://127.0.0.1:27017/mydata",)
.then(console.log("Mongo connected"))
.catch((err)=> console.log("Mongo error",err))

const userSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required: true,
    },
    last_name:{
        type:String
    },
    email_id:{
        type:String,
        required:true,
        unique: true
    },
    gender:{
        type:String
    }
})

//model creation 
const mymodel= mongoose.model('user',userSchema);

app.get("/users",async(req,res)=>{
    const allusers= await mymodel.find({});
    const html= `<ul>
        ${allusers.map((user)=> { return `<li> ${user.first_name}</li>`}).join("")}
    </ul>`
    return res.send(html);
})

app.post("/users",async(req,res)=>{
    const newuser= await mymodel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: req.body.email_id,
        gender: req.body.gender
    })

    console.log(`New user created: ${req.body.first_name}`);
    return res.status(201).json({msg:"success"});
})
app.get("/users/:id",async(req,res)=>{
    const iduser=  await mymodel.findById(req.params.id);
if(!iduser)return res.status(404).json("User not found");
    return res.json(iduser);
})

app.delete("/users/:id",async(req,res)=>{
    if(!todel) return res.status(404).json("Not any such id exists");
    const todel = await mymodel.findByIdAndDelete(req.params.id);
    return res.json("Success");
})

app.listen(port,()=>{//starting server
    console.log("Server started");
})
