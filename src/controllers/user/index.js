console.log("In index of user controller....");

const Joi = require('joi');
const { user } = require('../../use-cases');

const makeCreateUserAction = require('./createUser');
const createUserAction = makeCreateUserAction({
    Joi,
    createUser:user.createUser
});

const makegetUserAction = require('./getUser');
const getUserAction = makegetUserAction({
    Joi,
    getUser:user.getUser
});

const makegetAllUserAction = require('./getAllUser');
const getAllUserAction = makegetAllUserAction({
    getAllUser:user.getAllUser
});

const makeupdateUserAction = require('./updateUser');
const updateUserAction = makeupdateUserAction({
    Joi,
    updateUser:user.updateUser
});

const makedeleteUserAction = require('./deleteUser');
const deleteUserAction = makedeleteUserAction({
    Joi,
    deleteUser:user.deleteUser
});

const makehomePageAction = require('./homePage');
const homePageAction=makehomePageAction();

const userActions = Object.freeze({
    createUserAction,
    getUserAction,
    getAllUserAction,
    updateUserAction,
    deleteUserAction,
    homePageAction
});

module.exports = userActions;