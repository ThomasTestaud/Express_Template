const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');
const bcrypt = require('bcrypt');


const User = sequelizeInstance.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 12));
        },
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
    },
}, {
    indexes: [
        {unique: true, fields: ['email']},
        {unique: true, fields: ['username']},
    ]
});


module.exports = User;
