import mongoose, { Schema } from "mongoose";

const ProductsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discount_price: {
            type: Number,
            min: 0,
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        images: [
            {
                type: Schema.Types.ObjectId,
                ref: "Images",
            },
        ],
        typeProduct: {
            type: Schema.Types.ObjectId,
            ref: "ProductTypes",
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", ProductsSchema);
