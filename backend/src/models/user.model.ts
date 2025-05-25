import {Sequelize, Model, DataTypes} from "sequelize";
import {UserAttributes, UserCreationAttributes} from "../types/user.interface";

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: string;
    email!: string;
    password!: string;
    created_at!: Date;
    updated_at!: Date;

    static initModel(sequelize: Sequelize): typeof User {
        return User.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            email: {type: DataTypes.STRING, allowNull: false},
            password: {type: DataTypes.STRING, allowNull: false},

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,

        }, {
            sequelize,
            tableName: "users",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        });
    }
}
