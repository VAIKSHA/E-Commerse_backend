// This will be the starting file of the project

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

// Create an admin user at the starting of the application

// Connection with mongodb
mongoose.connect(db_config.DB_URL)
const db = mongoose.connection

db.on("err",()=>{
    console.log("Error while connection of mongoDB")
})
db.once("open",()=>{
    console.log("Connected to mongDB")
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "Admin"})
        if(user){
            console.log("Admin is already Present")
            return
        }
    }
    catch(err){
        console.log("Error while reading the data", err)
    }
     
    try{
        user = await user_model.create({
            name: "Vishal",
            userId : "Admin",
            email: "vs6143214@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1",8) // 8 is a salt ->(random text = salt)
            // it means password + random text = encrypt 
        })
        console.log("Admin created ", user)
    }
    catch(err){
        console.log("Error while creating admin", err)
    }
}

// Start the server
app.listen(server_config.PORT, ()=>{
    console.log("Server Started at port number: ",server_config.PORT)
})