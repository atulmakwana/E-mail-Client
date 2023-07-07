const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makeupdateFolder = require('./update-folder');

const sandbox = sinon.createSandbox();

After(() => {
    this.folderid = undefined;
    this.foldername = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});

const getFolder = function({folderid})
{
    if(!folderid || folderid==50)
        return [];

    return [
        {
            folderid: 32,
            foldername: 'Archived',
            folderuserid: 23,
            providerfolderid: null
        }
      ]
}

const folderDb = {
    updateDbFolder: function(){}
}

const updateFolderStub = sandbox.stub(folderDb,'updateDbFolder');

updateFolderStub.callsFake(({folderid,foldername})=>{
    if(!folderid || folderid==50){
        // console.log("in if of getUserStub",folderid)
        throw new Error("No such folder is there, you are trying to get...");
    }
    return "succesfull";
});

Given('Enter folderid: {string} and updated foldername: {string} for updating a folder',(folderid,foldername)=>{
    this.folderid=folderid || undefined;
    this.foldername=foldername || undefined;
});
Given('Second Enter folderid: {int} and updated foldername: {int} for updating a folder',
    (folderid,foldername) => {
        this.folderid=folderid || undefined;
        this.foldername=foldername || undefined;
    },
);
Given('Third Enter folderid: {int} and updated foldername: {string} for update a folder',
    (folderid,foldername) => {
        this.folderid=folderid || undefined;
        this.foldername=foldername || undefined;
    },
);

When('Try to update a folder',async ()=>{
    if(this.folderid){
        this.folderid = parseInt(this.folderid)
    }
    const updateFolder = makeupdateFolder({
        Joi,
        getFolder,
        updateDbFolder: folderDb.updateDbFolder
    });
    try{
        // console.log("ttttttttttttt",this.folderid,this.foldername,typeof this.folderid);

        this.result = await updateFolder({
            folderid:this.folderid,
            foldername:this.foldername
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


Then('Throw an error: {string} with message: {string} while updating a folder',(error,message)=>{
    // console.log("aaaaaaaaaaaa",error,message);
    // console.log("AAAAAAAAAAAA",this.error);
    expect(this.error).deep.equal({
        name:error,
        message
    });
});

Then('Updated the folder: {string}', (message) => {
    expect(this.result).deep.equal(message);
});
