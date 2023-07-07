module.exports = function makeupdateUserAction({
    Joi,
    updateUser
})
{
    return async function updateUserAction(req,res)
    {
        try{
            // console.info(`At updateUserAction :: ${JSON.stringify(req.body)} :: ${req.headers.databasename}`);
            // const {error} =   valiDateUpdateUser(req.body);
            // if (error) {
            //     return res.status(224).send({"Validation error at updateUserAction":error.message})
            // }
            let result = await updateUser({userid:req.params.id,uname:req.body.uname, databasename:req.headers.databasename });
            console.log(result);
            res.status(200).send(result);
        }
        catch(error){
            console.info(`ERROR at updateUserAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error.message);
        }
    }
    function valiDateUpdateUser(data)
    {
        const schema = Joi.object({
            uname:Joi.string().min(5).required(),
            userid:Joi.number().integer().required()
        });
        
        return schema.validate(data);
    }
}