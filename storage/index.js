const multer = require('multer')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename);
const storage = {}

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const stg = require(path.join(__dirname, file))(multer);
        storage[stg.name] = stg.multer;
    });

module.exports = storage