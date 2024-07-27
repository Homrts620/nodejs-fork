const express = require("express");
const router = express.Router();
const userController = require("../../controller/usersController");
const authMiddleware = require("../../validate/userMiddleware");
const {
    userJoiValidate,
    userSubscriptionJoi,
} = require("../../validate/userJoi");
const emailJoiValidate = require("../../validate/emailJoi");
const upload = require("../../validate/uploadMulter");
const verifyController = require("../../controller/verificationController");

router.post("/signup", userJoiValidate, userController.signUp);
router.post("/login", userJoiValidate, authMiddleware, userController.logIn);
router.patch(
    "/",
    authMiddleware,
    userSubscriptionJoi,
    userController.updateSubscription
);
router.get("/logout", authMiddleware, userController.logOut);
router.get("/current", authMiddleware, userController.current);

router.patch(
    "/",
    authMiddleware,
    userSubscriptionJoi,
    userController.updateSubscription
);
router.patch(
    "/avatars",
    authMiddleware,
    upload.single("avatar"),
    userController.updateAvatar
);

router.get(
    "auth/verify/:verificationToken",
    verifyController.userVerification
);

router.post(
    "users/verify",
    emailJoiValidate,
    verifyController.verificationEmailResend
);

module.exports = router;