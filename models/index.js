'use strict';

const fs = require('fs');
const path = require('path');
const { Model, DataTypes, Sequelize } = require('sequelize')
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes); 
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  console.log(db[modelName].associate)
  if (db[modelName].associate) {
    db[modelName].associate(db)
    db[modelName].sync({ alter: true })
  }
});
module.exports = db