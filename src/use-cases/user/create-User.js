function makeCreateUser({
    Joi,
    Kafka,
    runProducer,
    createDbUser,
    getDbUserByEmail,
    createDefaultFolders,
    createDbUserTopic
})
{
    return async function createUser({ uname,email,access_token,refresh_token,expiry_date,databasename })
    {
        const {error} =  validateUser({ uname,email });
        if (error) {
            throw new Error(error.message);
        }

        const userWithSameEmail = await getDbUserByEmail({email,databasename})
        if(userWithSameEmail.length>0){
            throw new Error("User already exist with same Email...")
        }

        const result = await createDbUser({ uname,email,access_token,refresh_token,expiry_date,databasename });

        console.log("AAAAAAAAAAAA",result);
        //default method of creating default folders
        await createDefaultFolders({ userid:result[0].userid });

        //another method of creating default folders, using the producer consumer concepts
        let data = { userid : result[0].userid }
        await runProducer({ topic: 'userCreatedFolders2',data })
        
        return result;
    }
    function validateUser({ uname,email })
    {
        const schema = Joi.object({
            uname:Joi.string().min(5).required(),
            email:Joi.string().email().required()
        });
        
        return schema.validate({ uname,email });
    }
}

module.exports = makeCreateUser;