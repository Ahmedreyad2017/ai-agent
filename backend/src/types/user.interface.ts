import {Optional} from "sequelize";


export type UserAttributes = {
    id: string;
    email: string;
    password: string;
    created_at: Date | null;
    updated_at: Date | null;

}


export type UserCreationAttributes = Optional<UserAttributes, "id" | "created_at" | "updated_at">;
