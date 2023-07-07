function makeUserDbMethods({ connection })
{
    return Object.freeze({
        createDbUser,
        getDbUser,
        getAllDbUser,
        updateDbUser,
        deleteDbUser,
        getDbUserByEmail
    });

    async function createDbUser({ uname,email,databasename })
    {
        let [result] = await connection.query(`insert into ${databasename}.users(name,email) values(?,?)`,[uname,email]);
        return result;
    }
    async function getDbUser({ userid,databasename })
    {
        const [result]=await connection.query( `select * from ${databasename}.users where userid=?`,[userid]);
        return result;
    }
    async function getAllDbUser({databasename})
    {
        const [result]=await connection.query( `select * from ${databasename}.users;`);
        console.log(result);
        return result;
    }
    async function updateDbUser( { userid,uname,databasename } )
    {
        const [result] = await connection.query( `update ${databasename}.users set name=? where userid=?`,[uname,userid]) ;
        return result;
    }
    async function deleteDbUser({userid,databasename })
    {
        const [result] = await connection.query( `delete from ${databasename}.users where userid=? ;`,[userid],);
        return result;
    }
    async function getDbUserByEmail({ email,databasename })
    {
        const [result]=await connection.query( `select * from ${databasename}.users where email=?`,[email]);
        return result;
    }
}

module.exports = makeUserDbMethods;