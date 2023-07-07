function makegetUser ({
    Joi,
    getDbUser
})
{
    
    return async function getUser({userid,databasename})
    {
        // const {error} =  validateData({userid});
        // if (error) {
        //     throw new Error(error.message);
        // }
        
        return await getDbUser({userid,databasename});
        // console.log("In actual getDbUser",result);
        // if(result && Array.isArray(result) && result.length>0){
        //     return result;
        // }
        // throw new Error("No such user is there, you are trying to get...")
    }

    function validateData({userid})
    {
        const schema = Joi.object({
            userid:Joi.number().integer().required()
        });
        
        return schema.validate({userid});
    }
}

module.exports = makegetUser;