module.exports = function makegetAccesToken({
    Kafka,
    OAuth2Client,
    updateUserAccesToken
})
{
    const CLIENT_ID = CLIENT_ID;
    const CLIENT_SECRET = CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3001/auth/google/callback";
    
    const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET,REDIRECT_URI);

    return async function getAccessToken()
    {
        databasename='emailclientcockroachdb';
        
        const kafka=new Kafka({
            clientId:'user-update-acces-token-producer',
            brokers:['localhost:9092']
        });
        const consumer = await kafka.consumer({ groupId:'myTokenConsumer' });
        
        await consumer.connect();
        await consumer.subscribe({ topic:'userCreatedAccessToken2'});
        
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("Message consumed at get getAccesToken ::",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString()
                });
                // let result =  await getAllRelatedUser({current_time,databasename:"emailclientcockroachdb"});
                let result = JSON.parse(message.value);
                // console.log("ABCDDDDDDDDDDDDDDDDDDDDDDD",result .relatedusers);
                for(let user of result.relatedusers)
                {
                    // console.log("userrrrrrrrrrrrrrrrrrrrr",user);
                    const REFRESH_TOKEN= user.refreshtoken;
                    
                    const { tokens } =  await client.refreshToken(REFRESH_TOKEN);
                    // console.log("Tokennnnnnnnnnnnnnnnnn",tokens);
                    // console.log("New acces tokennnn : ",tokens.access_token);
                    const updaterow = await updateUserAccesToken({userid:user.userid,access_token:tokens.access_token,expiry_date:tokens.expiry_date,databasename:"emailclientcockroachdb"})
                    // console.log("Row count :: ",updaterow.rowCount);
                }           
            }
        })
    }
}