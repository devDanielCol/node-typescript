import { Document, Types } from "mongoose";

export interface IAdmin {
    password: string;
    username: string;
    roll?: string;
    isSuperAdmin?: boolean;
    access?: {
        user: boolean;
        products: boolean;
    };
}

export interface AdminDocument extends IAdmin, Document {
    _id: Types.ObjectId;
}
