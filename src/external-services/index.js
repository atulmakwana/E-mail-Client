const axios = require('axios');
const { OAuth2Client } = require("google-auth-library");
const { google } = require('googleapis');

const CLIENT_ID =CLIENT_ID;
const CLIENT_SECRET = CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3001/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const makegetMsgList = require('./getMsgList');
const getMsgList = makegetMsgList({
    client,
    google,
    axios
})

const makegetEmailByMsgId = require('./getEmailByMsgId');
const getEmailByMsgId = makegetEmailByMsgId({
    client,
    google,
    axios
})


// getEmailByMsgId({userid:'123',ACCESS_TOKEN:'ya29.a0Ael9sCPJOUdoxAJahqchWzAxplDC0v87UsJklj8f_nzXoWO3JroiVHWx9LzAwxITjj-B3dGYB8yJU6Sm2E5Q_ga0AN7FRIs2f_i2zSA-bPSJHccpVMNq-bNmQ-HZoRproRDk9TlYZm4T9Vc3B4KPj26ElVFNaCgYKAXISARESFQF4udJhGbXF2quLzvYtkJxNuntdjA0163'});
// getMsgList({userid:'123',ACCESS_TOKEN:'ya29.a0Ael9sCPJOUdoxAJahqchWzAxplDC0v87UsJklj8f_nzXoWO3JroiVHWx9LzAwxITjj-B3dGYB8yJU6Sm2E5Q_ga0AN7FRIs2f_i2zSA-bPSJHccpVMNq-bNmQ-HZoRproRDk9TlYZm4T9Vc3B4KPj26ElVFNaCgYKAXISARESFQF4udJhGbXF2quLzvYtkJxNuntdjA0163'});


module.exports = Object.freeze({
    getMsgList,
    getEmailByMsgId,
})