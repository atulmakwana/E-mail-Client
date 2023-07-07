module.exports = function makegetFolderAction({
    Joi,
    getFolder
})
{
    return async function getFolderAction(req,res)
    {
        try{            
            console.info(`At getFolderAction :: ${(req.params.id)} :: ${req.headers.databasename}`);
            const {error} =  validateData({folderid:req.params.id});
            if (error) {
                throw new Error(error.message);
            }
            let result = await getFolder({ folderid:req.params.id, databasename:req.headers.databasename });
            console.log(result);
            res.status(200).send(result);
        }
        catch(error){
            console.info(`ERROR at getFolderAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error);
        }
    }
    function validateData({folderid})
    {
        const schema = Joi.object({
            folderid:Joi.number().integer().required()
        });
        
        return schema.validate({folderid});
    }
}