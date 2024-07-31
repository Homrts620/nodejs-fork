const User = require("../models/usersModel");

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const signUp = async (req, res, next) => {
const { username, email, password } = res.body;
const user = await User.findOne({ email }).lean();

if (user) {
    return res.status(409).json({
    status: "error",
    code: 409,
    message: "Email is already in use",
    data: "Conflict",
    });
}
try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
    status: "success",
    code: 201,
    data: {
        name: {
        email: email,
        subscription: "starter",
        },
    },
    });
} catch (error) {
    next(error);
}
};

const logIn = async (req, res, next) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
try {
    if (!user || !user.validPassword(password)) {
    return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect login or password",
        data: "Bad request",
    });
    }
    const payload = {
    id: user.id,
    username: user.username,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });

    res.json({
    status: "success",
    code: 200,
    data: {
        token,
        user: {
        email: email,
        subscription: "starter",
        },
    },
    });
} catch (error) {
    next(error);
}
};

const current = async (req, res, next) => {
const { email, subscription } = req.user;
res.json({
    code: 200,
    data: {
    email: email,
    subscription: subscription,
    },
});
};

const logOut = async (req, res) => {
try {

    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { token: null });
    res.status(200).json({
    message: "You are logged out!",
    });
} catch (error) {
    res.status(500).json({
    status: "error",
    code: 500,
    message: "Internal Server Error",
    });
}
};

module.exports = {
    signUp,
    logIn,
    current,
    logOut,
};