console.log("In index of use-case....");

const user = require('./user');
const folder = require('./folder');
const email = require('./email');
const kafka = require('./kafka');

module.exports = Object.freeze({
    user,
    folder,
    email,
    kafka
})