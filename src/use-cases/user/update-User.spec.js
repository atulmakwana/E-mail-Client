const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makeupdateUser = require('./update-User');

const sandbox = sinon.createSandbox();

After(() => {
    this.userid = undefined;
    this.uname = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});

const getUser = function({userid})
{
    if(!userid || userid==50)
        return [];

    return [
        {
            userid: 32,
            name: 'aaaaaaaaa',
            email: 'aaaaaaa@gmail.com',
            password: 'aaaaaaaaaa12345'
        }
      ]
}

const userDb = {
    updateDbUser: function(){}
}

const updateUserStub = sandbox.stub(userDb,'updateDbUser');

updateUserStub.callsFake(({userid,uname})=>{
    if(!userid || userid==50){
        // console.log("in if of getUserStub",userid)
        throw new Error("No such user is there, you are trying to get...");
    }
    return "succesfull";
});


Given('Enter userid: {string} and updated username: {string} for updating a user',(userid,uname)=>{
    this.userid=userid || undefined;
    this.uname=uname || undefined;
    // console.log("givennnnnnnnnnnnnnnnnnn",this.userid,this.uname);

});
Given('Second Enter userid: {int} and updated username: {int} for updating a user',
    (userid,uname) => {
        this.userid=userid || undefined;
        this.uname=uname || undefined;
    },
);
Given('Third Enter userid: {int} and updated username: {string} for update a user',
    (userid,uname) => {
        this.userid=userid || undefined;
        this.uname=uname || undefined;
    },
);

When('Try to update a user',async ()=>{
    if(this.userid){
        this.userid = parseInt(this.userid)
    }
    const updateUser = makeupdateUser({
        Joi,
        getUser,
        updateDbUser: userDb.updateDbUser
    });
    try
    {
        // console.log("ttttttttttttt",this.userid,this.uname,typeof this.uname);

        this.result = await updateUser({
            userid:this.userid,
            uname:this.uname
        })
        // console.log("resulttttttttttttt",this.result);
    }
    catch(e)
    {
        // console.log("errrrorrrrrrrrrr",e);
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
})


Then('Throw an error: {string} with message: {string} while updating a user',(error,message)=>{
    // console.log("aaaaaaaaaaaa",error,message);
    // console.log("AAAAAAAAAAAA",this.error);
    expect(this.error).deep.equal({
        name:error,
        message
    });
});

Then('Updated the user: {string}', (message) => {
    expect(this.result).deep.equal(message);
});
