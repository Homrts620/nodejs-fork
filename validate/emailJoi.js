const Joi = require("joi");

const emailJoi = Joi.object({
email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const emailJoiValidate = (req, res, next) => {
const { error } = emailJoi.validate(req.body);
if (error) {
    return res.status(400).json({
        status: "error",
        code: 400,
        message: error.details[0].message,
    });
}
next();
};
module.exports = emailJoiValidate;