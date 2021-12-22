 const fs = require('fs')
 const path = require('path')
 const basename = path.basename(__filename);
 const caches = {}


 fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const { cache, name } = require(path.join(__dirname, file));
        caches[name] = cache;
    });
   
 module.exports = caches