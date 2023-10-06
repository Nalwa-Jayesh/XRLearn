const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, "Please provide a name"]
    },
    email : {
        type : String,
        required : [true, "Please provide an email"]
    },
    password : {
        type : String,
        required : [true, "Please provide a password"]
    }
}, {timestamps : true}
)

const User = mongoose.model("User", userSchema)
module.exports = User