import { Schema, model } from "mongoose";
import { IUser, IUserData } from "../../types/models/User.type";

const UserDataSchema = new Schema<IUserData>(
    {
        _id: Schema.Types.ObjectId,
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        IsSubscriptor: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    { timestamps: true }
);

const UserSchema = new Schema<IUser>(
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
        ref: { type: Schema.Types.ObjectId, ref: "UserData" },
    },
    { timestamps: true }
);

UserSchema.methods.daniel = () => {
    console.log("validate");
};

const UserData = model("UserData", UserDataSchema);
const User = model("User", UserSchema);

export { User, UserData };
