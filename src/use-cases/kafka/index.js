const { Kafka } = require('kafkajs');
const { usertopicDb, userDb }= require('../../data-access-cockroach')


const makecreateuserTopic = require('./create-user-topic');
const createUserTopic = makecreateuserTopic({
    insertDbUserTopic: usertopicDb.insertDbUserTopic
});

const makegetuserTopic = require('./get-user-topic');
const getUserTopic = makegetuserTopic({
    getDbUserTopic: usertopicDb.getDbUserTopic
});

const makedeleteuserTopic = require('./delete-user-topic');
const deleteUserTopic = makedeleteuserTopic({
    deleteDbUserTopic: usertopicDb.deleteDbUserTopic
});

console.log("TYPEE:",typeof(createUserTopic))
console.log("TYPEE:",typeof(makecreateuserTopic));
const makeproducer = require('./producer');
const runProducer = makeproducer({
    Kafka,
    createUserTopic,
    insertDbUserTopic: usertopicDb.insertDbUserTopic
});

module.exports = Object.freeze({
    runProducer,
    getUserTopic,
    deleteUserTopic
});