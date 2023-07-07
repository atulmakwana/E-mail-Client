const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makedeleteFolder = require('./delete-folder');

const sandbox = sinon.createSandbox();

After(() => {
    this.folderid = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

const getFolder = function(folderid)
{
    if(!folderid || folderid==50)
        return [];

    return [
        {
            folderid: 35,
            foldername: 'Inbox',
            folderuserid: 32,
            providerfolderid: null
          },
      ]
}
const foldersDb = {
    deleteDbFolder: function(){}
};

const deleteFolderStub = sandbox.stub(foldersDb,'deleteDbFolder');

deleteFolderStub.callsFake(({folderid}) => {
    // console.log("in deleteFolderStub",folderid);
    return "Deleted the folder succesfully"
});



Given('Enter folderid: {string} to delete a folder',
    (folderid) => {
        this.folderid=(folderid) || undefined;
    },
);


When('Try to delete a folder', async ()=>{
    if(this.folderid){
        this.folderid=parseInt(this.folderid);
    }
    const deleteFolder = makedeleteFolder({
        Joi,
        getFolder,
        deleteDbFolder: foldersDb.deleteDbFolder,
    });
    try 
    {
        this.result = await deleteFolder({
            folderid: this.folderid
          });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while deleting a folder', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});


Then('Show message: {string}', (message) => {
    expect(this.result).deep.equal(message);
});