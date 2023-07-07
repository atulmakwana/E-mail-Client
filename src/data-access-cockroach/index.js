console.log("In index of data-access...");

const connection = require('../config').cockroachdbconnection;
const { createClient } = require('redis');

// let redisClient;

// (async () => {
//   redisClient = redis.createClient();
//   redisClient.on("error", (error) => console.error(`Error : ${error}`));
//   await redisClient.connect();
// })();
const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

const makeUserDbMethods = require('./users.db');
const userDb = makeUserDbMethods({
    redisClient,
    connection
});

const makeFolderDbMethods = require('./folders.db');
const folderDb = makeFolderDbMethods({
    connection
});

const makeEmailsDbMethods = require('./emails.db');
const emailDb = makeEmailsDbMethods({
    connection
});

const makeUserTopicsMethods = require('./userstopics.db');
const usertopicDb = makeUserTopicsMethods({
    connection
})

module.exports = { userDb, folderDb, emailDb, usertopicDb };