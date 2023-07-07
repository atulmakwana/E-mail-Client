module.exports = function makeupdateFolderProviderId({
    updateDbFolderProviderId
}){
    return async function updateFolderProviderId({ folderuserid,foldername,folderproviderid,databasename })
    {
        await updateDbFolderProviderId({ folderuserid,foldername,folderproviderid,databasename })
    }
}