import { body } from "express-validator";

export const emailVerify = body("email", {
    email: "Verify yout email",
}).isEmail({
    require_tld: true,
    domain_specific_validation: true,
    host_blacklist: ["robo.com"],
});
