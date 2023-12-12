import { IProducts, ProductDocument } from "src/types/models/products.type";
import { Product } from "../../../db/models/productsModel";
import { Service } from "../../../util/abstract/service.abs";

export class ProductsService extends Service<ProductDocument, IProducts> {
    constructor() {
        super(Product);
    }
}
