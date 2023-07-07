function makegetFolder({
    Joi,
    getDbFolder
})
{
    return async function getFolder({folderid,databasename})
    {
        const {error} =  validateData({folderid});
        if (error) {
            throw new Error(error.message);
        }

        return await getDbFolder({folderid,databasename});
    }
    function validateData({folderid})
    {
        const schema = Joi.object({
            folderid:Joi.number().integer().required()
        });
        
        return schema.validate({folderid});
    }
}

module.exports = makegetFolder;