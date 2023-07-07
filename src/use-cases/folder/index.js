console.log("In index of folder use-case....");

const Joi = require('joi')
const {folderDb} = require('../../data-access-cockroach');

const makeisAlreadyFolder = require('./is-Already-folder');
const isAlreadyFolder = makeisAlreadyFolder({
    checkDbFolder:folderDb.checkDbFolder
})

const makecreateFolder = require('./create-folder');
const createFolder = makecreateFolder({ 
    Joi,
    isAlreadyFolder,
    createDbFolder:folderDb.createDbFolder
});

const makegetFolder = require('./get-folder');
const getFolder = makegetFolder({
    Joi,
    getDbFolder:folderDb.getDbFolder
});

const makegetAllFolder = require('./get-All-folder');
const getAllFolder = makegetAllFolder({
    getAllDbFolder:folderDb.getAllDbFolder
});

const makeupdateFolder = require('./update-folder');
const updateFolder = makeupdateFolder({
    Joi,
    getFolder,
    updateDbFolder:folderDb.updateDbFolder
});

const makedeleteFolder = require('./delete-folder');
const deleteFolder = makedeleteFolder({
    Joi,
    getFolder,
    deleteDbFolder:folderDb.deleteDbFolder
});

const makeupdateFolderProviderId = require('./update-Folder-ProviderId');
const updateFolderProviderId = makeupdateFolderProviderId({
    updateDbFolderProviderId:folderDb.updateDbFolderProviderId
});

module.exports = Object.freeze({
    createFolder,
    getFolder,
    getAllFolder,
    updateFolder,
    deleteFolder,
    updateFolderProviderId
})