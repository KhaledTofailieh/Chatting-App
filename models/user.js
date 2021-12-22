'use strict';

const { Model } = require('sequelize')


module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      static associate(models) {
         console.log("this is assosiate")
         const profile = models['profile']
         const conversation = models['conversation']
         const u_c = models['user_conversation']
         User.hasMany(profile, {
            foreignKey: {
               name: 'userId',
               type: DataTypes.STRING,
               allowNull: true

            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
         })

         User.belongsToMany(conversation, { through: u_c })
         User.hasMany(u_c)
      }
      
   }
   User.init({
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      phone: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,

      },
      last_seen: {
         type: DataTypes.DATE,
         allowNull: true
      },
      is_active: {
         type: DataTypes.BOOLEAN,
         defaultValue: true
      },
      is_logged: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      role: {
         type: DataTypes.STRING(12),
         defaultValue: 'user'
      },
      main_language: {
         type: DataTypes.STRING(12),
         defaultValue: 'english'
      },
      learn_language: {
         type: DataTypes.STRING(12),
         defaultValue: 'english'
      }
   },
      {
         sequelize,
         modelName: 'user',
         tableName: 'users',
      }
   )
   User.findAndCountAll({

   })
   return User
}