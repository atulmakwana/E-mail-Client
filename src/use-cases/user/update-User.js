function makeupdateUser({
    Joi,
    getUser,
    updateDbUser
})
{
    return async function updateUser( { userid,uname,databasename } )
    {
        // const {error} = validateUser({ userid,uname });
        // if (error) {
        //     throw new Error(error.message);
        // }
        let result = await getUser({userid,databasename});
        if(result ){
            return await updateDbUser({ userid,uname,databasename});
        }
        throw new Error("No such user is there, you are trying to update...")
    }
    function validateUser({ userid,uname })
    {
        const schema = Joi.object({
            userid:Joi.number().integer().required(),
            uname:Joi.string().min(5).required()
        });
        
        return schema.validate({ userid,uname });
    }
}

module.exports = makeupdateUser ;