import { Schema, model } from "mongoose";

const ProductTypesShema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    imageUrl: {
        type: Schema.Types.ObjectId,
        ref: "Images",
    },
});

export const ProductTypes = model("ProductTypes", ProductTypesShema);
