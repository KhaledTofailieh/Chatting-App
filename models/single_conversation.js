'use-strict'
const { Model } = require('sequelize')
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;
module.exports = (sequelize, DataTypes) => {
    class Single extends Model {

        static associate(models) {
            const conv = models['conversation']

            Single.belongsTo(conv, {
                foreignKey: {
                    name: 'conversationId',
                    allowNull: false,
                },
                scope: {
                    type: 'single'
                },
                constraints: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    }
    Single.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },
        {
            sequelize,
            modelName: 'single',
            tableName: 'single_conversations',
        })
    return Single
}