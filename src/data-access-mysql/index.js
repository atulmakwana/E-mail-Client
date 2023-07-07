console.log("In index of data-access...");

const connection = require('../config').mysqldbconnection;

const makeUserDbMethods = require('./users.db');
const userDb = makeUserDbMethods({
    connection
});

const makeFolderDbMethods = require('./folders.db');
const folderDb = makeFolderDbMethods({
    connection
});

module.exports = { userDb, folderDb};
