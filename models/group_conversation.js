'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        static associate(models) {
            const conv = models['conversation']
            const profile = models['profile']
            Group.belongsTo(conv, {
                foreignKey: {
                    name: 'conversationId',
                    allowNull: false,
                },
                onDelete:'CASCADE',
                onUpdate:'CASCADE',
                scope:{
                    type:'group'
                },
                constraints: true
            })
            // Group.hasOne(profile)
        }
    }
    Group.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        link: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: ''
        },
        type: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'public'
        },
        language: {
            type: DataTypes.STRING(12),
            allowNull: false,
            defaultValue: 'english'
        }

    }, {
        sequelize,
        modelName: 'group',
        tableName: 'groups',
    })
    return Group
}