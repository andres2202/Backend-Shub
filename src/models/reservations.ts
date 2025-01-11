import { Model, DataTypes } from "sequelize";
import { sequelize } from "../helpers/DataBaseConnection";

export class Reservations extends Model {
    declare id: number;
    declare user_id: number;
    declare hotel_id: number;
    declare chek_in_date: Date;
    declare check_out_date: Date;
}

Reservations.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chek_in_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    check_out_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'reservations'
});