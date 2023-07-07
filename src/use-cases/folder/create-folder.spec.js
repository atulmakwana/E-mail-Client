const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makecreateFolder = require('./create-folder');

const sandbox = sinon.createSandbox();

Before(() => {
    this.foldername = undefined;
    this.folderuserid = undefined;
    this.folderproviderid = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

const isAlreadyFolder = function({foldername,folderuserid})
{
    // console.log("In the isAlreadyFolder...");
    if(folderuserid==1 && foldername=='Inbox')
        return [
            {
                folderid: 1,
                foldername: "Inbox",
                folderuserid: 1,
                providerfolderid: null
            }
        ];

    return [];
}

const foldersDb = {
    createDbFolder: function(){}
};

const createDbFolderStub = sandbox.stub(foldersDb, 'createDbFolder');

createDbFolderStub.callsFake((args) => {
    expect(args).deep.equal({
        foldername: this.foldername,
        folderuserid: this.folderuserid,
        folderproviderid: this.folderproviderid,
    });
    // console.log("In createDbFolderStub.callsFake...",args);
    return 'succesfull';
});


Given('Folder details foldername: {string}, folderuserid: {string}, folderproviderid: {string} to create new folder',
    (foldername, folderuserid, folderproviderid) => {
      this.foldername = foldername || undefined;
      this.folderuserid = folderuserid || undefined;
      this.folderproviderid = folderproviderid || undefined;
    },
);
Given('Second Folder details foldername: {int}, folderuserid: {int}, folderproviderid: {string} to create new folder',
    (foldername, folderuserid, folderproviderid) => {
      this.foldername = foldername || undefined;
      this.folderuserid = folderuserid || undefined;
      this.folderproviderid = folderproviderid || undefined;
    },
);

When('Try to create new folder', async ()=>{
    const createFolder = makecreateFolder({
        Joi,
        isAlreadyFolder,
        createDbFolder:foldersDb.createDbFolder,
    });
    try 
    {
        if(this.folderuserid){
            this.folderuserid=parseInt(this.folderuserid)
        }
        // console.log("asdfghjklasdfgjkl",this.uname,this.email,this.password)
        this.result = await createFolder({
          foldername: this.foldername,
          folderuserid: this.folderuserid,
          folderproviderid: this.folderproviderid,
        });
        // console.log("whyyyyyyyyyyyy",this.result);
      } catch (e) {
        // console.log("When :: Error",e.name,e.message)
        this.error = {
          name: e.name,
          message: e.message,
        };
      }
});


Then('Throw error: {string} with message: {string} while creating a new folder', (error, message) => {
//   console.log("aaaaaaaaaaaa",error,message);
//   console.log("AAAAAAAAAAAA",this.error);
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});

Then('Created the folder: {string}', (newUserDetails) => {
    expect(this.result).deep.equal(newUserDetails);
});