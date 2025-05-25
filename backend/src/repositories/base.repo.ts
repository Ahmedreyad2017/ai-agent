import {FindOptions, Model, ModelStatic, Attributes, DestroyOptions, UpdateOptions, CreateOptions} from "sequelize";

export abstract class BaseRepo<T extends Model> {
    constructor(protected model: ModelStatic<T>) {
    }


    async findAll(options?: FindOptions): Promise<T[]> {
        return this.model.findAll(options);
    }

    async findOne(options?: FindOptions<Attributes<T>>): Promise<T | null> {
        return this.model.findOne(options);
    }

    async delete(options?: DestroyOptions<Attributes<T>>): Promise<number> {
        return this.model.destroy(options);
    }

    async update(
        data: {
            [key in keyof Attributes<T>]?:
            | Attributes<T>[key]
            | undefined;
        },
        options: Omit<UpdateOptions<Attributes<T>>, "returning"> & {
            returning: Exclude<
                UpdateOptions<Attributes<T>>["returning"],
                undefined | false
            >;
        }
    ): Promise<[affectedCount: number, affectedRows: T[]]> {
        return this.model.update(data, options);
    }

    async create(
        data:Partial<T["_creationAttributes"]>,
        options?: CreateOptions<Attributes<T>> | undefined
    ): Promise<T> {
        // @ts-ignore
        return await this.model.create(data, options);
    }

}