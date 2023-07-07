const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makedeleteUser = require('./delete-User');

const sandbox = sinon.createSandbox();

After(() => {
    this.userid = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

const getUser = function({userid})
{
    if(!userid || userid==45)
        return [];

    return [
        {
          userid: 35,
          name: 'asdf2222',
          email: 'asdfg@gmail.com',
          password: 'asdfghj'
        }
      ]
}
const usersDb = {
    deleteDbUser: function(){}
};

const deleteUserStub = sandbox.stub(usersDb,'deleteDbUser');

deleteUserStub.callsFake(({userid}) => {
    // console.log("in deleteUserStub",userid);
    return "Deleted the user succesfully"
});



Given('Enter user id: {string} to delete a user',
    (userid) => {
        this.userid=(userid) || undefined;
    },
);


When('Try to delete a user', async ()=>{
    if(this.userid){
        this.userid=parseInt(this.userid);
    }
    const deleteUser = makedeleteUser({
        Joi,
        getUser,
        deleteDbUser: usersDb.deleteDbUser,
    });
    try 
    {
        this.result = await deleteUser({
            userid: this.userid
          });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while deleting a user', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message: {string}', (message) => {
    expect(this.result).deep.equal(message);
});