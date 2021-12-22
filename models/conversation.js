'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Conversation extends Model {

        getTypeable(options) {
            if (!this.commentableType) return Promise.resolve(null);
            const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
            return this[mixinMethodName](options);
          }

        static associate(models) {
            const user = models['user']
            const u_c = models['user_conversation']
            const message = models['message']
            const single = models['single']
            const group = models['group']
            Conversation.belongsToMany(user, { through: u_c })
            Conversation.hasMany(u_c, {
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            })
            Conversation.hasMany(message, {
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            })
            Conversation.hasOne(single, {
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                
            })
            Conversation.hasOne(group, {
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                
            })
        }
    }
    Conversation.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING(10),
            defaultValue:'single',
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'conversation',
        tableName: 'conversations',
    })

    Conversation.addHook("afterFind", findResult => {
        console.log('has hook played ')
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
            console.log(instance)
            if (instance.type === "single" && instance.single !== undefined) {
                instance.typeable = instance.single
            } else if (instance.type === "group" && instance.group !== undefined) {
                instance.typeable = instance.group
            }
            delete instance.single;
            delete instance.dataValues.single;
            delete instance.group;
            delete instance.dataValues.group;
        }
       
    })

    return Conversation
}