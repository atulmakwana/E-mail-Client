console.log("In index of handlers...");


var parseEmail = require('gmail-api-parse-message');
const axios = require('axios');
const { Kafka } = require('kafkajs');
const { google } = require('googleapis');
const { OAuth2Client } = require("google-auth-library");

const { user,email,folder,kafka } = require('../use-cases');

const CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3001/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const makegetAccesToken = require('./getAccessToken')
const getAccesToken = makegetAccesToken({
    Kafka,
    OAuth2Client,
    updateUserAccesToken:user.updateUserAccesToken
})


const makecreateEmailData = require('./createEmailData');
const createEmailData = makecreateEmailData({
    axios,
    client,
    Kafka,
    parseEmail,
    createEmail:email.createEmail,
    createRecipient:email.createRecipient,
    createAttachment:email.createAttachment,
    saveAttachment:email.saveAttachment
})


const makegetEmailMessageList = require('./getEmailMessageList');
const getEmailMessageList = makegetEmailMessageList({
    Kafka,
    client,
    axios,
    runProducer:kafka.runProducer
})


getAccesToken();
getEmailMessageList();
createEmailData();