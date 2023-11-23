import { Schema, model } from "mongoose";

const ProductCategoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        imageUrl: String,
    },
    { timestamps: true }
);

export const ProductsCategories = model("Category", ProductCategoriesSchema);
