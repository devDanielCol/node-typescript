import { Router } from "express";
import ProductsController from "./controllers/product";

const api = Router();

const productsCtr = new ProductsController();

api.post("/add", productsCtr.create);

export default api;
