import { Document, Types } from "mongoose";
import { ImagesDocument } from "./images.type";

export interface IProducts {
    name: string;
    description: string;
    imageUrl: ImagesDocument["_id"];
    category: CategoriesDocument["_id"];
    available: boolean;
}

export interface ProductDocument extends IProducts, Document {
    _id: Types.ObjectId;
}

export interface ICategories {
    name: string;
    description: string;
    imageUrl: ImagesDocument["_id"];
}

export interface CategoriesDocument extends ICategories, Document {
    _id: Types.ObjectId;
}
