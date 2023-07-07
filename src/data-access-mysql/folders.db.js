function makeFolderDbMethods({connection})
{
    return Object.freeze({
        createDbFolder,
        getDbFolder,
        getAllDbFolder,
        updateDbFolder,
        deleteDbFolder,
        checkDbFolder
    });

    async function createDbFolder({foldername,folderproviderid,folderuserid,databasename})
    {
        let [result] = await connection.query( `insert into ${databasename}.folders(foldername,folderuserid,providerfolderid) values(?,?,?)`,[foldername,folderuserid,folderproviderid]);
        console.log(result);
        return result;
    }
    async function getDbFolder({folderid,databasename})
    {
        let [result] = await connection.query( `select * from ${databasename}.folders where folderid=?`,[folderid]);
        return result.rows;
    }
    async function getAllDbFolder({databasename})
    {
        let [result] = await connection.query( `select * from ${databasename}.folders;`);
        return result.rows;
    }
    async function updateDbFolder({folderid,foldername,databasename})
    {
        let [result] = await connection.query( `update ${databasename}.folders set foldername=? where folderid=?`,[foldername,folderid]) ;
        return result;
    }
    async function deleteDbFolder({folderid,databasename})
    {
        let [result] = await connection.query( `delete from ${databasename}.folders where folderid=? ;`,[folderid]);
        return result;
    }
    async function checkDbFolder({foldername,folderuserid,databasename})
    {
        let [result] = await connection.query( `select * from ${databasename}.folders where foldername=? and folderuserid=?;`,[foldername,folderuserid]);
        return result;
    }
}

module.exports = makeFolderDbMethods;