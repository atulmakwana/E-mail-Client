const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makeCreateUser = require('./create-User');

const sandbox = sinon.createSandbox();

Before(() => {
    this.uname = undefined;
    this.email = undefined;
    this.password = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

const usersDb = {
    getDbUserByEmail:function(){},
    createDbUser: function(){},
    createDefaultFolders: function(){}
};
const getDbUserByEmailStub = sandbox.stub(usersDb, 'getDbUserByEmail');
const createUserStub = sandbox.stub(usersDb, 'createDbUser');
const createDefaultFoldersStub = sandbox.stub(usersDb, 'createDefaultFolders');

createUserStub.callsFake((args) => {
    expect(args).deep.equal({
        uname: this.uname,
        email: this.email,
        password: this.password,
    });
    return '{id:1}';
});

getDbUserByEmailStub.callsFake(({email}) => {
  expect(email).deep.equal(this.email);

  if(email!='atullll@gmail.com'){
    return [];
  }

  return [
    {
      userid: 18,
      name: 'atullll',
      email: 'atullll@gmail.com',
      password: 'atulll123'
    },
  ]
});

createDefaultFoldersStub.callsFake(({args}) => {
    // expect(args).deep.equal({
    //     uname: this.uname,
    //     email: this.email,
    //     password: this.password,
    // });
    // console.log("In the createDefaultFoldersStub.callsFake ::  ",args);
    return;
});

Given('User details uname: {string}, email: {string}, password: {string} to create new user',
    (uname, email, password) => {
      this.uname = uname || undefined;
      this.email = email || undefined;
      this.password = password || undefined;
    },
);
Given('User details uname: {int}, email: {string}, password: {string} to create new user',
    (uname, email, password) => {
      this.uname = uname || undefined;
      this.email = email || undefined;
      this.password = password || undefined;
    },
);

When('Try to create new user', async ()=>{
    const createUser = makeCreateUser({
        Joi,
        createDbUser: usersDb.createDbUser,
        getDbUserByEmail:usersDb.getDbUserByEmail,
        createDefaultFolders: usersDb.createDefaultFolders
    });
    try 
    {
        // console.log("asdfghjklasdfgjkl",this.uname,this.email,this.password)
        this.result = await createUser({
          uname: this.uname,
          email: this.email,
          password: this.password,
        });
        // console.log("whyyyyyyyyyyyy",this.result);
      } catch (e) {
        // console.log("loggggggggggggg",e.name,e.message)
        this.error = {
          name: e.name,
          message: e.message,
        };
      }
});


Then('Throw error: {string} with message: {string} while creating a user', (error, message) => {
  // console.log("aaaaaaaaaaaa",error,message);
  // console.log("AAAAAAAAAAAA",this.error);
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});

Then('It will create new user with details: "{string}"', (newUserDetails) => {
    expect(this.result).deep.equal(newUserDetails);
});

// Then('createDefaultFolders function will call {int} time while creating new user',(createDefaultFoldersFunctionCallCount) => {
//     console.log("ahahahahahha",createDefaultFoldersStub);
//     console.log("hehehehehehehe",createDefaultFoldersFunctionCallCount);
//       sinon.assert.callCount(createDefaultFoldersStub, createDefaultFoldersFunctionCallCount);
//       sinon.assert.callCount()
// });

//   NodeJS/Clean_Code_Architecture/node_modules/@cucumber/cucumber/bin/cucumber.js src/use-cases/user