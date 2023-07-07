function makeUserDbMethods({ redisClient,connection })
{
    return Object.freeze({
        createDbUser,
        getDbUser,
        getAllDbUser,
        updateDbUser,
        deleteDbUser,
        getDbUserByEmail,
        updateDbUserAccesToken,
        getAllDbRelatedUser
    });

    async function createDbUser({ uname,email,access_token,refresh_token,expiry_date,databasename })
    {
        let result = await connection.query(`insert into ${databasename}.users(name,email,accesstoken,refreshtoken,expirytime) values($1,$2,$3,$4,$5) RETURNING userid`,[uname,email,access_token,refresh_token,expiry_date]);
        return result.rows;
    }
    async function getDbUser({ userid,databasename })
    {
        const rediResult = await redisClient.hGetAll(userid);
        // console.log("REDISSSSSSSSSSSSSSSSSS",rediResult)
        
        if(!rediResult.userid)
        {
            const result=await connection.query( `select * from ${databasename}.users where userid=($1)`,[userid]);
            
            for(let index in result.rows[0])
            {
                await redisClient.hSet(userid, index, result.rows[0][index]);
            }
            
            return result.rows;
        }

        return rediResult;

    }
    async function getAllDbUser({databasename})
    {
        const result=await connection.query( `select * from ${databasename}.users;`);
        return result.rows;
    }
    async function updateDbUser( { userid,uname,databasename } )
    {
        const result = await connection.query( `update ${databasename}.users set name=($1) where userid=($2)`,[uname,userid]) ;

        const rediResult = await redisClient.hGetAll(userid);
        
        if(rediResult.userid)
        {
            await redisClient.hSet(userid, 'name', uname);
        }

        return result;
    }
    async function deleteDbUser({userid,databasename })
    {
        const result = await connection.query( `delete from ${databasename}.users where userid=($1) cascade;`,[userid],)
        return result;
    }
    async function getDbUserByEmail({ email,databasename })
    {
        const result=await connection.query( `select * from ${databasename}.users where email=($1)`,[email]);
        return result.rows;
    }
    async function updateDbUserAccesToken({ userid,access_token,expiry_date,databasename })
    {
        // console.log("AT updateDbUserAccesTokennnnnnnnnnnnnn::", userid,access_token,expiry_date,databasename );
        const result = await connection.query( `update ${databasename}.users set(accesstoken,expirytime) = ($1,$2) where userid=$3`,[access_token,expiry_date,userid]) ;
        // console.log("RESULTTTTTTTTTTTTTTTTTTTTTTTTTT",result);
        return result;
    }
    async function getAllDbRelatedUser({current_time,databasename})
    {
        const result=await connection.query( `select * from ${databasename}.users where expirytime-${current_time}>=60000;`); //1800000
        return result.rows;
    }
}

module.exports = makeUserDbMethods;