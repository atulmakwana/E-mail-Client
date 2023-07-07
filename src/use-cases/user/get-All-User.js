function makegetAllUser({
    getAllDbUser
})
{
    return async function getAllUser({databasename})
    {
        return await getAllDbUser({databasename});
    }
}

module.exports = makegetAllUser;