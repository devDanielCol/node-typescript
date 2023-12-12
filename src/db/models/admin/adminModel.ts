import { Schema, model } from "mongoose";
import { AdminDocument } from "../../../types/models/admin.type";

export const AdminSchema = new Schema<AdminDocument>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 9,
        },
        password: {
            type: String,
            required: true,
            minlength: 10,
            mazlength: 25,
        },
        roll: { type: String, default: "admin" },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        access: {
            user: { type: Boolean, default: false },
            products: { type: Boolean, default: false },
        },
    },
    { timestamps: true }
);

export const Admin = model<AdminDocument>("Admin", AdminSchema);
