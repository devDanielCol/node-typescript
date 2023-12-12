import { Types } from "mongoose";

export interface ImagesInterface {
    name: string;
    url: string;
    alt: string;
}

export interface ImagesDocument extends ImagesInterface, Document {
    _id: Types.ObjectId;
}
