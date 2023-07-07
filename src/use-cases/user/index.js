console.log("In index of user use-case....");

const Joi = require('joi');
const {Kafka} = require('kafkajs')
const { userDb, folderDb,usertopicDb } = require('../../data-access-cockroach');


const makecreateDefaultFolder = require('./create-Default-folder');
const createDefaultFolders = makecreateDefaultFolder({
    Kafka,
    createDbFolder:folderDb.createDbFolder
});

const makeproducer = require('../kafka/producer');
const runProducer = makeproducer({
    Kafka
});


const makeCreateUser = require('./create-User');
const createUser = makeCreateUser({
    Joi,
    Kafka,
    runProducer,
    createDefaultFolders,
    getDbUserByEmail:userDb.getDbUserByEmail,
    createDbUser:userDb.createDbUser,
    createDbUserTopic:usertopicDb.insertDbUserTopic
});

const makegetUser = require('./get-User');
const getUser = makegetUser({
    Joi,
    getDbUser:userDb.getDbUser
});

const makegetAllUser = require('./get-All-User');
const getAllUser = makegetAllUser({
    getAllDbUser:userDb.getAllDbUser
});

const makeupdateUser = require('./update-User');
const updateUser = makeupdateUser({
    Joi,
    getUser,
    updateDbUser:userDb.updateDbUser
});

const makedeleteUser = require('./delete-User');
const deleteUser = makedeleteUser({
    Joi,
    getUser,
    deleteDbUser:userDb.deleteDbUser
});

const makeupdateUserAccesToken = require('./update-User-access-token');
const updateUserAccesToken = makeupdateUserAccesToken({
    updateDbUserAccesToken:userDb.updateDbUserAccesToken,
})

const makegetAllRelatedUser = require('./get-All-Related-User');
const getAllRelatedUser = makegetAllRelatedUser({
    getAllDbRelatedUser:userDb.getAllDbRelatedUser
});


module.exports = Object.freeze({
    createUser,
    getUser,
    getAllUser,
    updateUser,
    deleteUser,
    updateUserAccesToken,
    getAllRelatedUser,
    createDefaultFolders

})