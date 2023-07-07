function makeisAlreadyFolder({
    checkDbFolder
})
{
    return async function checkFolders({foldername,folderuserid,databasename})
    {
        return await checkDbFolder({foldername,folderuserid,databasename});
    }
}

module.exports = makeisAlreadyFolder;