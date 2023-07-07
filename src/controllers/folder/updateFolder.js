module.exports = function makeupdateFolderAction({
    Joi,
    updateFolder
})
{
    return async function updateFolderAction(req,res)
    {
        try{
            console.info(`At updateFolderAction :: ${JSON.stringify(req.body)} :: ${req.headers.databasename}`);
            const { error } = valdateupdateFolder(req.body);
            if (error) {
                return res.status(224).send({"Validation error at updateFolderAction ":error.message})
            }
            
            let result = await updateFolder({ folderid:req.params.id,foldername:req.body.foldername, databasename:req.headers.databasename });
            console.log(result);
            res.status(201).send(result);
        }
        catch(error){
            console.info(`ERROR at updateFolderAction :: ${error.message} :: ${error.stack}`);  
            res.status(400).send(error.message);
        }
    }
    function valdateupdateFolder(data)
    {
        const schema = Joi.object({
            folderid:Joi.number().integer().required(),
            foldername:Joi.string().min(5).required()
        });
        
        return schema.validate(data);
    }
}