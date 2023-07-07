console.log("In index of controller....");

const userActions = require('./user');
const folderActions = require('./folder')
const authAction = require('./Oauth');

const controllers = Object.freeze({
    userActions,
    folderActions,
    authAction
});

module.exports = controllers;