module.exports = function makecreateFolderAction({
    Joi,
    createFolder
})
{
    return async function createFolderAction(req,res)
    {
        try{
            console.info(`At createFolderAction :: ${JSON.stringify(req.body)} :: ${req.headers.databasename}`);
            // const {error} = valiDateCreateFolder(req.body);
            // if (error) {
            //     return res.status(224).send({"Validation error at createFolderAction ":error.message})
            // }
            let result=await createFolder({ foldername:req.body.foldername,folderproviderid:req.body.folderproviderid,folderuserid:req.body.folderuserid, databasename:req.headers.databasename });
            console.log(result);
            res.status(201).send(result);
        }
        catch(error){
            console.info(`ERROR at createFolderAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error.message);
        }
    }
    function valiDateCreateFolder(data)
    {
        const schema = Joi.object({
            folderuserid:Joi.number().integer().required(),
            foldername:Joi.string().min(5).required(),
            folderproviderid:Joi.number()
        });
        
        return schema.validate(data);
    }
}