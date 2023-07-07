module.exports = async function makedeleteuserTopic({
    deleteDbUserTopic
})
{
    return async function deleteUserTopic({id})
    {
        await deleteDbUserTopic({id})
    }   
}