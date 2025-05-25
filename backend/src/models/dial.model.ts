import { Sequelize, Model, DataTypes } from "sequelize";
import { DialAttributes, DialCreationAttributes, Transcript } from "../types";
import { DialStatus } from "../enums";

export class Dial extends Model<DialAttributes, DialCreationAttributes> implements DialAttributes {
    dial_session_id!: string;
    dial_id!: string;
    dest_number_id!: string;
    call_agent_id!: string;
    source_number!: string;
    status!: DialStatus;
    summary!: string | null;
    transcript!: Transcript[];
    recording_url!: string | null;
    recording_id!: string | null;
    created_at!: Date;
    updated_at!: Date;
    started_at!:Date | null;
    ended_at!:Date | null;
    duration_seconds!:number | null;
    static initModel(sequelize: Sequelize): typeof Dial {
        return Dial.init({
            dial_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            dial_session_id: { type: DataTypes.STRING, allowNull: false },
            dest_number_id: { type: DataTypes.STRING, allowNull: true },
            call_agent_id: { type: DataTypes.STRING, allowNull: true },
            source_number: { type: DataTypes.STRING, allowNull: true },
            status: {
                type: DataTypes.ENUM(...Object.values(DialStatus)),
                defaultValue: DialStatus.QUEUED,
                allowNull: false,
            },
            summary: { type: DataTypes.STRING, allowNull: true },
            transcript: { type: DataTypes.JSONB, allowNull: true },
            recording_id: { type: DataTypes.STRING, allowNull: true },
            recording_url: { type: DataTypes.STRING, allowNull: true },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            started_at:{allowNull:true,type:DataTypes.DATE},
            ended_at: {allowNull:true,type:DataTypes.DATE},
            duration_seconds:{allowNull:true,type:DataTypes.INTEGER},
        }, {
            sequelize,
            tableName: "dials",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        });
    }
}
