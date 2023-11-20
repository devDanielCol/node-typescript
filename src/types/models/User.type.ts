import { Document, Types } from "mongoose";

export interface IUser {
    password: string;
    email: string;
    isactive: boolean;
    validatedAccount: boolean;
    userData: UserDataDocument["_id"];
    deactivated?: boolean;
}

export interface UserDocument extends IUser, Document {
    _id: Types.ObjectId;
}

export interface IUserData {
    name?: string;
    lastname?: string;
    IsSubscriptor?: boolean;
    userLogin?: UserDocument["_id"];
}

export interface UserDataDocument extends IUserData, Document {
    _id: Types.ObjectId;
}

export interface IUserRef extends IUser, IUserData {
    userDataId: never;
    userLoginId: never;
    isactive: never;
    IsSubscriptor: never;
}
