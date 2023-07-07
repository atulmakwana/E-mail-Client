module.exports = function makedeleteFolderAction({
    Joi,
    deleteFolder
})
{
    return async function deleteFolderAction(req,res)
    {
        try{
            console.info(`At deleteFolderAction :: ${(req.params.id)} :: ${req.headers.databasename}`);
            const {error} =  validateData({folderid:req.params.id});
            if (error) {
                throw new Error(error.message);
            }

            console.info(`At deleteFolderAction :: ${req.params.id}`);
            let result=await deleteFolder({ folderid:req.params.id, databasename:req.headers.databasename });
            console.log(result);
            res.status(204).send(result);
        }
        catch(error){
            console.info(`ERROR at deleteFolderAction :: ${error.message} :: ${error.stack}`);            
            res.status(400).send(error.message);
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