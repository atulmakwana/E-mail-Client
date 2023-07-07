function makeFolderDbMethods({connection})
{
    return Object.freeze({
        createDbFolder,
        getDbFolder,
        getAllDbFolder,
        updateDbFolder,
        deleteDbFolder,
        checkDbFolder,
        updateDbFolderProviderId
    });

    async function createDbFolder({foldername,folderproviderid,folderuserid,priority,databasename})
    {
        let result = await connection.query( `insert into ${databasename}.folders(foldername,folderuserid,providerfolderid,priority) values($1,$2,$3,$4)`,[foldername,folderuserid,folderproviderid,priority            ]);
        return result.rows;
    }
    async function getDbFolder({folderid,databasename})
    {
        let result = await connection.query( `select * from ${databasename}.folders where folderid=($1)`,[folderid]);
        return result.rows;
    }
    async function getAllDbFolder({databasename})
    {
        let result = await connection.query( `select * from ${databasename}.folders;`);
        return result.rows;
    }
    async function updateDbFolder({folderid,foldername,databasename})
    {
        let result = await connection.query( `update ${databasename}.folders set foldername=($1) where folderid=($2)`,[foldername,folderid]) ;
        return result;
    }
    async function deleteDbFolder({folderid,databasename})
    {
        let result = await connection.query( `delete from ${databasename}.folders where folderid=($1) ;`,[folderid],)
        return result;
    }
    async function checkDbFolder({foldername,folderuserid,databasename})
    {
        let result = await connection.query( `select * from ${databasename}.folders where foldername=($1) and folderuserid=($2);`,[foldername,folderuserid],)
        return result;
    }
    async function updateDbFolderProviderId({folderuserid,folderproviderid,foldername,databasename})
    {
        let result = await connection.query( `update ${databasename}.folders set providerfolderid=$1 where folderuserid=$2 and foldername=$3`,[folderproviderid,folderuserid,foldername]) ;
        return result;
    }
}

module.exports = makeFolderDbMethods;

//checkdb,create,update
// select * from folders where folderuserid='eb100283-d494-456e-9932-f283b136a1d5' order by priority desc limit 1;
