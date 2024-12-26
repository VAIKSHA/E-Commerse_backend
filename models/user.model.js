const mongoose = require("mongoose")

// name, id, password, email, usertype  // user Schema created
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    userId : {
        type: String,
        required: true,
        unique: true
    },
    password :{
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true,
        lowecase : true,
        minLength : 10,
        unique : true
    },
    usertype: {
        type: String,
        required : true,
        default: "CUSTOMER",
        enum: ["CUSTOMER","ADMIN"] // enum-> one of the two value
    }
},{timestamps: true, versionKey: false})

module.exports = mongoose.model("User", userSchema)  // -> file to module convert