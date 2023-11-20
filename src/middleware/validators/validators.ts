import { body } from "express-validator";

export const emailVerify = body("email", {
    email: "Verify your email",
})
    .notEmpty()
    .withMessage("Email can´t be empty")
    .isEmail({
        require_tld: true,
        domain_specific_validation: true,
        host_blacklist: ["robo.com"],
    })
    .withMessage("Invalid Email");

export const passwordVerify = body("password")
    .notEmpty()
    .withMessage("Password can´t be empty")
    .isLength({ min: 8, max: 20 })
    .withMessage("Invalid password, min length 8, and max 20");
