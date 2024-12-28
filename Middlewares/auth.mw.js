// Create the middleware will check if the request body is proper and correct
const user_model = require("../models/user.model")
const verifySignUpBody = async (req, res, next)=>{
    try{
        // Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed! name was not provided in this body"
            })
        }
        // Check for the email
        if(!req.body.email){
            return res.status(400).send({
                message: "Failed! Email was not provided in this body"
            })
        }
        // Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed! userId was not provided in this body"
            })
        }
        // Check if the user with the same userId is already present
        const user = await user_model.findOne({userId: req.body.userId})
        if(user){
            return res.status(400).send({
                message: "Failed! userId is already registed"
            })
        }

        next()
    }
    catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}

module.exports = {
    verifySignUpBody: verifySignUpBody
}