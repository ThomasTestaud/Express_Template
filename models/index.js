const sequelizeInstance = require('./_model.js');
const User = require('./user.js');

//Relations

//Sync
sequelizeInstance.sync(/*{alter: true}*/);

module.exports = {
    User,
};
