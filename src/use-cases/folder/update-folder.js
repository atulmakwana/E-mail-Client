function makeupdateFolder({
    Joi,
    updateDbFolder,
    getFolder
})
{
    return async function updateFolder({folderid,foldername,databasename})
    {
        const { error } = validateFolder({folderid,foldername});
        if (error) {
            throw new Error(error.message)
        }
        let result = await getFolder({folderid,databasename});
        if(result && Array.isArray(result) && result.length > 0){
            return await updateDbFolder({folderid,foldername,databasename});
        }
        throw new Error("No such folder is exist,that you are trying to update...")
    }
    function validateFolder({folderid,foldername})
    {
        const schema = Joi.object({
            folderid:Joi.number().integer().required(),
            foldername:Joi.string().min(5).required()
        });
        
        return schema.validate({folderid,foldername});
    }
}

module.exports = makeupdateFolder