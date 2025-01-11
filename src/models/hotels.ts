import { Model, DataTypes } from "sequelize";
import { sequelize } from "../helpers/DataBaseConnection";
import { Reservations } from "./reservations";

export class Hotels extends Model {
    declare id: number;
    declare name: string;
    declare location: string;
}

Hotels.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'hotels'
});

Hotels.hasMany(Reservations, {
        foreignKey: 'hotel_id'
    }
)