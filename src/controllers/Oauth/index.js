const { OAuth2Client } = require("google-auth-library");
const { google } = require('googleapis');
const { Kafka } = require('kafkajs');

const { user,kafka,email } = require('../../use-cases');


const CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3001/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


const { getMsgList,getEmailByMsgId, } = require('../../external-services');

const makeAuthenticationAction=require("./authentication");
const autheticationAction=makeAuthenticationAction({
    Kafka,
    client,
    createUser:user.createUser,
    fetchGmailFolder:email.fetchGmailFolder,
   
});

const authAction = Object.freeze({
    googleAuthLogin:autheticationAction.googleAuthLogin,
    googleAuthCallback:autheticationAction.googleAuthCallback
});

module.exports=authAction;