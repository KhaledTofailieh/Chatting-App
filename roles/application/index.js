const path = require('path')
const fs = require('fs')

const basename = path.basename(__filename);
const roles = {}

fs.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
  const role = require(path.join(__dirname, file)); 
  roles[role.name] = role.permissions;
});

module.exports = roles