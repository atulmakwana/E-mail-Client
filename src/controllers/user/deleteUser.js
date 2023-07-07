module.exports = function makedeleteUserAction({
    Joi,
    deleteUser
})
{
    return async function deleteUserAction(req,res)
    {
        try{
            console.info(`At deleteUserAction :: ${req.params.id} :: ${req.headers.databasename} `);
            // const {error} =  validateData({userid:req.params.id});
            // if (error) {
            //     throw new Error(error.message);
            // }
            
            let result=await deleteUser({userid:req.params.id, databasename:req.headers.databasename });
            console.log(result);
            res.status(204).send(result);
        }
        catch(error){
            console.info(`ERROR at deleteUserAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error.message);
        }
    }
    function validateData({userid})
    {
        const schema = Joi.object({
            userid:Joi.number().integer().unsafe().required(),
        });
        
        return schema.validate({userid});
    }
}