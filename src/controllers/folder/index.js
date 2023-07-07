console.log("In index of folder controller....");

const Joi = require('joi');
const {folder} = require('../../use-cases');

const makecreateFolderAction = require('./createFolder');
const createFolderAction = makecreateFolderAction({
    Joi,
    createFolder:folder.createFolder
});

const makegetFolderAction = require('./getFolder');
const getFolderAction = makegetFolderAction({
    getFolder:folder.getFolder
});

const makegetAllFolderAction = require('./getAllFolder');
const getAllFolderAction = makegetAllFolderAction({
    getAllFolder:folder.getAllFolder
});

const makeupdateFolderAction = require('./updateFolder');
const updateFolderAction = makeupdateFolderAction({
    Joi,
    updateFolder:folder.updateFolder
});

const makedeleteFolderAction = require('./deleteFolder');
const deleteFolderAction = makedeleteFolderAction({
    Joi,
    deleteFolder:folder.deleteFolder
});


const folderActions = Object.freeze({
    createFolderAction,
    getFolderAction,
    getAllFolderAction,
    updateFolderAction,
    deleteFolderAction,
});

module.exports = folderActions;