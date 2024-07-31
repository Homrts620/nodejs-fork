const Joi = require("joi");

const userJoi = Joi.object({
    password: Joi.string().min(8).max(16).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const userJoiValidate = (req, res, next) => {
const result = Joi.validate(req.body, userJoi);

if (result.error) {
    const errorMessage = result.error.details
    .map((detail) => detail.message)
    .join(", ");
    res.status(400).json({ message: errorMessage });
} else {
    next();
}
};
module.exports = {
userJoiValidate,
};