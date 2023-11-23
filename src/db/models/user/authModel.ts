import { Schema, model } from "mongoose";
import { UserDocument } from "../../../types/models/User.type";

export const UserSchema = new Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 9,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        isactive: {
            type: Boolean,
            default: true,
        },
        validatedAccount: {
            type: Boolean,
            default: false,
        },
        userData: {
            type: Schema.Types.ObjectId,
            ref: "UserData",
            required: true,
        },
        deactivated: {
            type: Boolean,
            default: false,
            required: false,
        },
        resetPasswordToken: {
            type: String,
            default: "null",
        },
        resetPasswordExpire: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

export const User = model<UserDocument>("User", UserSchema);
