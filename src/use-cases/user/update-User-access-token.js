module.exports = function makeupdateUserAccesToken({
    updateDbUserAccesToken
})
{
    return async function updateUserAccesToken( { userid,access_token,expiry_date,databasename } )
    {
        return await updateDbUserAccesToken({ userid,access_token,expiry_date,databasename});
    }
}