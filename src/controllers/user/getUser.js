module.exports = function makegetUserAction({
    Joi,
    getUser
})
{
    return async function getUserAction(req,res)
    {
        try{
            console.info(`At getUserAction :: ${req.params.id} :: ${req.headers.databasename}`);

            // const {error} =  validateData({userid:req.params.id});
            // if (error) {
            //     throw new Error(error.message);
            // }

            let result = await getUser({userid:req.params.id, databasename:req.headers.databasename});
            console.log(result);
            res.status(200).send(result);
        }
        catch(error){
            console.info(`ERROR at getUserAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error.message);
        }
    }
    function validateData({userid})
    {
        const schema = Joi.object({
            userid:Joi.number().integer().required()
        });
        
        return schema.validate({userid});
    }
}