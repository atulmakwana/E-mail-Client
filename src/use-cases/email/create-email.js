module.exports = function makeCreateEmail({
    createDbEmail
}){
    return async function createEmail({email,userid})
    {
        return await createDbEmail({email,userid})
    }
}