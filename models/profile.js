'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {

        static associate(models) {
            const User = models['user']
            Profile.belongsTo(User, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }
    Profile.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    }, {
        sequelize,
        modelName: "profile",
        tableName: 'profiles'
    })

    return Profile
}