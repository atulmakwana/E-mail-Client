module.exports = function makeCreateRecipient({
    createDbRecipient
}){
    return async function createRecipient({ emailname, id ,emailtype })
    {
        // calling 
        return await createDbRecipient({ emailname, id ,emailtype });
    }
}