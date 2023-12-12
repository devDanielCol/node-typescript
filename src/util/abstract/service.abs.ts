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
            const data = await this.Model.create(raw);
            return { created: true, data };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async insertMany(many: DataModelType[]) {
        try {
            const data = await this.Model.insertMany(many);
            return { created: true, data };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async getAll() {
        try {
            const data = await this.Model.find();
            return { success: true, data };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async getOne(_id: Types.ObjectId) {
        try {
            const data = await this.Model.findOne({ _id });
            return { success: true, data };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async updateOne(
        filter: FilterQuery<ModelType>,
        raw: UpdateWithAggregationPipeline | UpdateQuery<ModelType> | undefined
    ) {
        try {
            const data = await this.Model.updateOne(filter, raw);
            return { updated: true, data };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async updateMany(
        filter: FilterQuery<ModelType>,
        raw: UpdateWithAggregationPipeline | UpdateQuery<ModelType> | undefined
    ) {
        try {
            const data = await this.Model.updateMany(filter, raw);
            return { updated: true, data };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }

    public async deleteOne(filter: FilterQuery<ModelType>) {
        try {
            const data = await this.Model.findOneAndDelete(filter);
            return { deleted: true, data };
        } catch (error) {
            throw new ErrorHandler(String(error)).emit();
        }
    }
}
