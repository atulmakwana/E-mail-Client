module.exports = function makeCreateUserAction({
    Joi,
    createUser
})
{
    return async function createUserAction(req,res)
    {
        try{
            console.info(`At createUserAction :: ${JSON.stringify(req.body)} :: ${req.headers.databasename}`);
            // const {error} =  valiDateCreateUser(req.body);
            // if (error) {
            //     return res.status(400).send({"validation error at createUserAction ":error.message})
            // }
            let result = await createUser({ uname:req.body.uname,email:req.body.email,acces_token:null,refresh_token:null, expiry_date:null,databasename:req.headers.databasename });
            console.log(result);
            res.status(201).send(result);
        }
        catch(error){
            console.info(`ERROR at createUserAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error.message);
        }
    }
    function valiDateCreateUser(data)
    {
        const schema = Joi.object({
            uname:Joi.string().min(5).required(),
            email:Joi.string().email().required(),
            // password:Joi.string().alphanum().min(6).required()
        });
        
        return schema.validate(data);
    }
}
