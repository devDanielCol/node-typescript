import { Request } from "express";
import { ApiRestMethod } from "../../../util/decorators/restapi/controller.decorator";
import { ProductsService } from "../services/products";
import { IProducts } from "src/types/models/products.type";

const service = new ProductsService();

export default class ProductsController {
    @ApiRestMethod
    public async create(req: Request<never, never, never, IProducts>) {
        return await service.createOne(req.body);
    }
}
