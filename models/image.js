'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
    //   const User = models['user']
    //   Image.belongsTo(User,{
    //         onDelete: 'CASCADE',
    //         onUpdate: 'CASCADE'
    //   })
    }

  }

  Image.init({
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
    modelName: "image",
    tableName: 'images'
  })

  return Image
}