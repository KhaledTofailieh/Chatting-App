'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
    const conversation = models['conversation']
    const user = models['user_conversation']
   
    Message.belongsTo(user,{
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    })

    Message.belongsTo(conversation,{
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    })
    }
  }

  Message.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content:{
     type: DataTypes.STRING(1000),
     allowNull: false
    }
  }, {
    sequelize,
    modelName: "message",
    tableName: 'messages',
  })

  return Message
}