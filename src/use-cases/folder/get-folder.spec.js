const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makegetFolder = require('./get-folder');

const sandbox = sinon.createSandbox();

After(() => {
    this.folderid = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const folderDb = {
    getDbFolder: function(){}
};

const getFolderStub = sandbox.stub(folderDb,'getDbFolder');

getFolderStub.callsFake(({folderid}) => {
    // console.log("in getFolderStub",folderid)
    if(!folderid || folderid==50){
        throw new Error("No such folder is there, you are trying to get...");
    }

    return "succesfull";
});



Given('Enter folderid: {string} to get a folder',
    (folderid) => {
        this.folderid=(folderid) || undefined;
    },
);

When('Try to get a folder', async ()=>{
    if(this.folderid){
            this.folderid=parseInt(this.folderid);
        }
    const getFolder = makegetFolder({
        Joi,
        getDbFolder: folderDb.getDbFolder,
    });
    try 
    {
        this.result = await getFolder({
          folderid: this.folderid
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


Then('Throw error: {string} with message: {string} while getting a folder', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got the folder: {string}', (message) => {
    expect(this.result).deep.equal(message);
});