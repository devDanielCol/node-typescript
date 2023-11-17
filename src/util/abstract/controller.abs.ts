/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Model } from "mongoose";
import ClassMethods from "../decorators/global/classMethods";
import { ApiRestMethod } from "../decorators/restapi/controller.decorator";
/**
 * @argument ModelType This is the type of the model that wilbe used in this controller, each controller only have a single Model<ModelType>
 */
@ClassMethods(ApiRestMethod)
export class Controller<ModelType> {
    private Model: Model<ModelType>;

    /**
     * Constructor of the Controller abstract class.
     * @param Model The model that this model will be use
     */
    constructor(Model: Model<ModelType>) {
        this.Model = Model;
    }

    public async createOne(
        { params, body }: Request<never, never, ModelType>,
        resp: Response
    ) {
        const raw = body ? body : {};
        return await this.Model.create(raw);
    }

    public async insertMany(
        { params, body }: Request<never, never, ModelType[]>,
        resp: Response
    ) {
        const raw = body ? body : [];
        return await this.Model.insertMany(raw);
    }

    public async getAll(req: Request, resp: Response) {
        return await this.Model.find();
    }

    public async getOne({ params }: Request<{ id: string }>, resp: Response) {
        const { id: _id } = params;
        return await this.Model.findOne({ _id });
    }

    public async updateOne(
        { params, body }: Request<{ id: string }, never, ModelType>,
        resp: Response
    ) {
        const { id: _id } = params;
        const raw = body ? body : {};

        return await this.Model.updateOne({ _id }, raw);
    }
}
