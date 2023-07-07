const fs = require('fs');
const axios = require('axios');

const { Kafka } = require('kafkajs');
const { google } = require('googleapis');
const { OAuth2Client } = require("google-auth-library");

const { createFolder, updateFolderProviderId} = require('../folder');
const { emailDb } = require('../../data-access-cockroach');

const CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3001/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const makeproducer = require('../kafka/producer');
const runProducer = makeproducer({
    Kafka
});

const makefetchGmailFolder=require("./fetch-Gmail-Folder");
const fetchGmailFolder=makefetchGmailFolder({
    Kafka,
    client,
    google,
    createFolder,
    updateFolderProviderId,
    runProducer
});

const makefetchmails = require('./fetch-mails');
const fetchmails = makefetchmails({
    client,
    google,
    // usecase for inserting emails in the table
})

const makeCreateEmail = require('./create-email');
const createEmail = makeCreateEmail({
    createDbEmail:emailDb.createDbEmail
});

const makeCreateRecipient = require('./create-recipients');
const createRecipient = makeCreateRecipient({
    createDbRecipient:emailDb.createDbRecipient
})

const makeCreateAttachment = require('./create-attachments');
const createAttachment = makeCreateAttachment({
    createDbAttachment:emailDb.createDbAttachment
})

const makesaveAttachment = require('./save-attachments');
const saveAttachment = makesaveAttachment({
    fs,
    client,
    google,
    axios,
    OAuth2Client
})

module.exports = Object.freeze({
    fetchmails,
    createEmail,
    createRecipient,
    createAttachment,
    fetchGmailFolder,
    saveAttachment
})