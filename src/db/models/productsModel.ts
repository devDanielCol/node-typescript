import { Schema, model } from "mongoose";
import {
    CategoriesDocument,
    ProductDocument,
} from "src/types/models/products.type";

const ProductCategoriesSchema = new Schema<CategoriesDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        imageUrl: {
            type: Schema.Types.ObjectId,
            ref: "Images",
            require: true,
        },
    },
    { timestamps: true }
);

const ProductSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            unique: true,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        // imageUrl: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Images",
        //     require: true,
        // },
        // category: {
        //     type: Schema.Types.ObjectId,
        //     ref: "ProductCategories",
        //     require: true,
        // },
        available: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const ProductCategories = model<CategoriesDocument>(
    "ProductCategories",
    ProductCategoriesSchema
);

export const Product = model<ProductDocument>("Product", ProductSchema);
