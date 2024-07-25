const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
password: {
    type: String,
    required: [true, "Password is required"],
},

email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
},

subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
},

token: {
    type: String,
    required: true,
    ref: "User",
},

avatarURL: {
    type: String,
    required: true,
},
});

const User = mongoose.model("user", users);

module.exports = User;