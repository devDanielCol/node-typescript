import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";
import { ProductsService } from "../services/products";
import { Request } from "express";
import { IProducts } from "../../../types/models/products.type";

const service = new ProductsService();
export default class ProductsController {
    @ApiRestMethod
    public async create(req: Request<never, never, IProducts>) {
        return await service.createOne(req.body);
    }

    @ApiRestMethod
    public async getAll() {
        return await service.getAll();
    }
}
