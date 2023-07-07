module.exports = function makecreateuserTopic({
    insertDbUserTopic
})
{
    return async function createUserTopic({id,tenant})
    {
        console.log("AT createUserTopic:::::")
        await insertDbUserTopic({id,tenant})
    }   
}