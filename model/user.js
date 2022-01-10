const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
    createdAt: String,
    token: [{
        token:String,
    }]
})

const User = mongoose.model("User", userSchema);

module.exports = User;