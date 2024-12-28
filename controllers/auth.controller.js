// I need to write the cotroller / logic to register a user
const bcrypt = require("bcryptjs")  // for Encrypt the password
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")  // for generate token
const secret = require("../configs/auth.config") // secret for token genration

// for signUp the user at 1st time -> (controller)
exports.signup = async (req, res)=>{
    // Logic to create the user

    // 1. Read the request body
    const request_body = req.body 
    // 2. Insert the data in the user collection in mongodb
    const userObj = {
        name : request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password,8)
    }
    // 3. Return the response back to the user
    try{
        const user_created = await user_model.create(userObj)
        // return this user
        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.usertype,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }
        res.status(201).send(res_obj)
        // 201 is http status code for succesfully created
    }
    catch(err){
        console.log("Error while registering the user ", err)
        res.status(500).send({
            message: "Some error happened while registering the user"
        })
        // 500 is internal server error
    }
}

// for signIn the user after creating the account -> (controller)
exports.signin = async (req, res)=>{
    // Check if the user id s present in the system
    const user = await user_model.findOne({userId: req.body.userId})
    if (!user) {
        return res.status(400).send({
            message: "This is not a valid User Id"
        });
    }
    // Check if password is provided in the request
    if (!req.body.password) {
        return res.status(400).send({
            message: "Password is required"
        });
    }
    // Check if password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Password is Incorrect"
        });
    }
    // Using jwt we will creste the access tokens with a given TTL & return
    const token = jwt.sign({ id: user.userId }, secret.secret, {
        expiresIn: 120 // jwt.sign is method to create the token
    }); // expire in 120 second

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.usertype,
        accessToken: token
    });
}