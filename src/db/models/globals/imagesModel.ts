import { Schema, model } from "mongoose";

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
});

export const Images = model("Images", ImageSchema);
