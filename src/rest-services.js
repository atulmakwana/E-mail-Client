const controllers = require('./controllers');
const express= require('express');

const router=express.Router();


function init()
{
    initUserRoutes();
    initFolderRoutes();
    authRoutes();
}

function initUserRoutes()
{
    router.get('/', controllers.userActions.homePageAction);
    router.post('/users', controllers.userActions.createUserAction);
    router.get('/users', controllers.userActions.getAllUserAction);
    router.get('/users/:id', controllers.userActions.getUserAction);
    router.put('/users/:id', controllers.userActions.updateUserAction);
    router.delete('/users/:id', controllers.userActions.deleteUserAction);
}
function initFolderRoutes()
{
    router.post('/folders', controllers.folderActions.createFolderAction);
    router.get('/folders', controllers.folderActions.getAllFolderAction);
    router.get('/folders/:id', controllers.folderActions.getFolderAction);
    router.put('/folders/:id', controllers.folderActions.updateFolderAction);
    router.delete('/folders/:id', controllers.folderActions.deleteFolderAction);
}
function authRoutes()
{
    router.get('/auth/google',controllers.authAction.googleAuthLogin);
    router.get('/auth/google/callback',controllers.authAction.googleAuthCallback);
    // router.get('/auth/google/getaccestoken',controllers.authAction.getAccessToken);
}

module.exports = { router,init };