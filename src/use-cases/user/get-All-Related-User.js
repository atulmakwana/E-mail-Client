function makegetAllRelatedUser({
    getAllDbRelatedUser
})
{
    return async function getAllRelatedUser({current_time,databasename})
    {
        return await getAllDbRelatedUser({current_time,databasename});
    }
}

module.exports = makegetAllRelatedUser;