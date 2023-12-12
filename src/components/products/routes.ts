import { Router } from "express";
import ProductsController from "./controllers/products";
import { body } from "express-validator";
import { ValidateSession } from "../../middleware/session/session";

const ProductsCtrl = new ProductsController();
const api = Router();

api.post(
    "/create",
    ValidateSession,
    body("name").notEmpty().withMessage("Name is required."),
    body("description").notEmpty().withMessage("Description is required."),
    ProductsCtrl.create
);

api.get("/", ProductsCtrl.getAll);

export default api;
