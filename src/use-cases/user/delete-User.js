function makedeleteUser({
    Joi,
    getUser,
    deleteDbUser
})
{
    return async function deleteUser({userid,databasename })
    {
        // const {error} =  validateData({userid});
        // if (error) {
        //     throw new Error(error.message);
        // }

        let result = await getUser({ userid,databasename });
        if(result && result.length>0){
            return await deleteDbUser({ userid,databasename });
        }
        throw new Error("No such user is there, you are trying to delete...")
    }
    function validateData({userid})
    {
        const schema = Joi.object({
            userid:Joi.number().integer().unsafe().required(),
        });
        
        return schema.validate({userid});
    }
}

module.exports = makedeleteUser;