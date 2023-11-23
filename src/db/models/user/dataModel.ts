import { Schema, model } from "mongoose";
import { UserDataDocument } from "../../../types/models/User.type";

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

export const UserData = model<UserDataDocument>("UserData", UserDataSchema);
