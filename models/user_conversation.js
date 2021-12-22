'use-strict'
const { group } = require('console')
const { Model } = require('sequelize')
const { isNull } = require('util')

module.exports = (sequelize, DataTypes) => {
    class UserConversation extends Model {

        static associate(models) {
        const conv = models['conversation']
        const user = models['user']
        // const message = models['message']

        // UserConversation.hasMany(message, {
        //     foreignKey: {
        //        name: 'userId',
        //        type: DataTypes.STRING,
        //        allowNull: false
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE'
        //  })
        UserConversation.belongsTo(conv, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            constraints:false
        })

        UserConversation.belongsTo(user, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            constraints:false
        })
        
        }
    }
    UserConversation.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING(10),
            defaultValue: 'owner',
            allowNull: false
        },
    
    }, {
        sequelize,
        modelName: 'user_conversation',
        tableName: 'user_conversation'
    })

    // UserConversation.addHook("afterFind", findResult => {
    //     console.log('has hook played ')
    //     if (!Array.isArray(findResult)) findResult = [findResult];
    //     for (const instance of findResult) {
    //         if (instance.conversation.type === "single" && instance.conversation.single !== null) {
    //             instance.conversation.typeable = instance.conversation.single
    //             console.log("sinle")
    //         } else if (instance.conversation.type === "group" && instance.conversation.group !== null) {
    //             instance.conversation.typeable = instance.conversation.group
    //         }
    //         delete instance.conversation.single;
    //         delete instance.dataValues.conversation.single;
    //         delete instance.conversation.group;
    //         delete instance.dataValues.conversation.group;
    //         console.log(instance.conversation)
    //     }
       
    // })

    return UserConversation
}