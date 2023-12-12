import { Router } from "express";
import ProductsController from "./controllers/products";
import { body } from "express-validator";
import { ValidateAdminSession } from "../../middleware/session/adminSession";

const ProductsCtrl = new ProductsController();
const api = Router();

api.post(
    "/create",
    ValidateAdminSession,
    body("name").notEmpty().withMessage("Name is required."),
    body("description").notEmpty().withMessage("Description is required."),
    ProductsCtrl.create
);

api.get("/", ProductsCtrl.getAll);

export default api;
