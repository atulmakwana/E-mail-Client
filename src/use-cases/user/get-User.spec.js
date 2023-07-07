const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makegetUser = require('./get-User');

const sandbox = sinon.createSandbox();

After(() => {
    this.userid = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const usersDb = {
    getDbUser: function(){}
};

const getUserStub = sandbox.stub(usersDb,'getDbUser');

getUserStub.callsFake(({userid}) => {
    // console.log("in getUserStub",userid)
    if(!userid || userid==45){
        // console.log("in if of getUserStub",userid)
        throw new Error("No such user is there, you are trying to get...");
    }

    return "succesfull";
});



Given('First Enter userid: {string} for getting a user',
    (userid) => {
        this.userid=(userid) || undefined;
    },
);

Given('Second Enter userid: {string} to get a user',
    (userid) => {
        this.userid=(userid) || undefined;
    },
);

When('Try to get a user', async ()=>{
    if(this.userid){
            this.userid=parseInt(this.userid);
        }
    const getUser = makegetUser({
        Joi,
        getDbUser: usersDb.getDbUser,
    });
    try 
    {
        this.result = await getUser({
          userid: this.userid
        });
    } 
    catch (e) {
        // console.log("errrrorrrrrrrrrr",e);
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while getting a user', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got the user: {string}', (message) => {
    expect(this.result).deep.equal(message);
});