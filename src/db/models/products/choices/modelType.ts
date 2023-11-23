import { Schema, model } from "mongoose";

const ModelTypesSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: {
        type: Schema.Types.ObjectId,
        ref: "Images",
    },
});

export const ModelTypes = model("ModelTypes", ModelTypesSchema);
