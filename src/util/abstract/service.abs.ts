/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import {
    FilterQuery,
    Model,
    Types,
    UpdateQuery,
    UpdateWithAggregationPipeline,
} from "mongoose";
import { ErrorHandler } from "./error.abs";
/**
 * @argument ModelType This is the type of the model that wilbe used in this controller, each controller only have a single Model<ModelType>
 */
export class Service<ModelType, DataModelType> {
    protected Model: Model<ModelType>;

    /**
     * Constructor of the Controller abstract class.
     * @param Model The model that this model will be use
     */
    constructor(Model: Model<ModelType>) {
        this.Model = Model;
    }

    public async createOne(raw: DataModelType) {
        try {
            return await this.Model.create(raw);
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async insertMany(many: DataModelType[]) {
        try {
            return await this.Model.insertMany(many);
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async getAll() {
        try {
            return await this.Model.find();
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async getOne(_id: Types.ObjectId) {
        try {
            return await this.Model.findOne({ _id });
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async updateOne(
        filter: FilterQuery<ModelType>,
        raw: UpdateWithAggregationPipeline | UpdateQuery<ModelType> | undefined
    ) {
        try {
            return await this.Model.updateOne(filter, raw);
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }
}
