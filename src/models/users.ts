import  { Model, DataTypes } from 'sequelize';
import { sequelize } from '../helpers/DataBaseConnection';
import { Reservations } from './reservations';

export class Users extends Model {
    declare id: number;
    declare email: string;
    declare password: string;
    declare role: typeof DataTypes.ENUM;
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'users'
});

Users.hasMany(Reservations, {
        foreignKey: 'user_id'
    }
)