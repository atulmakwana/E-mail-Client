function makedeleteFolder({
    Joi,
    deleteDbFolder,
    getFolder
})
{
    return async function deleteFolder({folderid,databasename})
    {
        const {error} =  validateData({folderid});
        if (error) {
            throw new Error(error.message);
        }

        let result = await getFolder(folderid,databasename);
        if(result && Array.isArray(result) && result.length > 0){
            return await deleteDbFolder(folderid,databasename);
        }
        throw new Error("No such folder is exist,that you are trying to delete...")
    }
    function validateData({folderid})
    {
        const schema = Joi.object({
            folderid:Joi.number().integer().required()
        });
        
        return schema.validate({folderid});
    }
}

module.exports = makedeleteFolder;