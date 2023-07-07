module.exports = async function makegetuserTopic({
    getDbUserTopic
})
{
    return async function getUserTopic({id})
    {
        await getDbUserTopic({id})
    }   
}