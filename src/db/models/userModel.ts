import { Schema, model } from "mongoose";
import { UserDataDocument, UserDocument } from "../../types/models/user.type";

export const UserDataSchema = new Schema<UserDataDocument>(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        IsSubscriptor: {
            type: Boolean,
            default: false,
            required: false,
        },
        userLogin: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

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

const UserData = model<UserDataDocument>("UserData", UserDataSchema);
const User = model<UserDocument>("User", UserSchema);

export { User, UserData };
