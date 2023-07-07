function makecreateFolder({
    Joi,
    createDbFolder,
    isAlreadyFolder
})
{
    return async function createFolder({foldername,folderproviderid,folderuserid,priority,databasename})
    {
        // const {error} = validateFolder({foldername,folderproviderid,folderuserid});
        // if (error) {
        //     throw new Error(error.message)
        // }
        let result = await isAlreadyFolder({foldername,folderuserid,databasename});

        // if(result && Array.isArray(result) && result.length<=0)
        
        if(result && result.rows.length<=0)
        {
            return await createDbFolder({foldername,folderproviderid,folderuserid,priority,databasename});
        }

        throw new Error("Folder is already exist for the given user...")
    }
    function validateFolder({foldername,folderproviderid,folderuserid})
    {
        const schema = Joi.object({
            folderuserid:Joi.number().integer().required(),
            foldername:Joi.string().min(5).required(),
            folderproviderid:Joi.number().integer().allow(null)
        });
        
        return schema.validate({foldername,folderproviderid,folderuserid});
    }
}

module.exports = makecreateFolder;