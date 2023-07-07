// this handler will publish the message list on a topic


module.exports = function makegetEmailMessageList({
    Kafka,
    client,
    axios,
    runProducer
}){
    // code to fectch emails and store it in db
    return async function getEmailMessageList()
    {
        try {
            
            const kafka=new Kafka({
                clientId:'user-update-acces-token-producer',
                brokers:['localhost:9092']
            });
            const consumer = await kafka.consumer({ groupId:'myMessageListConsumer' });
            
            await consumer.connect();
            await consumer.subscribe({ topic:'foldersCreatedFetchMails'});
            
            await consumer.run({
                eachMessage: async({ topic, partition, message }) => {
                    console.log("Message consumed at get getEmailMessageList ::",{
                        partition,
                        offset: message.offset,
                        value: message.value.toString()
                    });      
                    console.log("asdfffffffffffffffffffff::",JSON.parse(message.value))
                    const userid = (JSON.parse(message.value)).userid;

                    ACCESS_TOKEN = (JSON.parse(message.value)).ACCESS_TOKEN;
                    
                    client.setCredentials({
                        access_token:ACCESS_TOKEN,
                    });
                    const data = {
                        ACCESS_TOKEN,
                        userid
                    }

                    const queryParams = {
                    //   maxResults: 10, 
                      q: 'newer_than:2d',
                    };

                    let nextPageToken;
                    if( (JSON.parse(message.value)).nextPageToken )
                    {
                        nextPageToken = (JSON.parse(message.value)).nextPageToken
                        queryParams.pageToken = nextPageToken;
                    }
                    
                    const response = await axios.get( 
                        'https://www.googleapis.com/gmail/v1/users/me/messages',
                        { 
                            params : queryParams,
                            headers : {
                                Authorization: `Bearer ${ACCESS_TOKEN}`,
                            } 
                        }
                    );

                    // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRR getEmailMessageList :: ",response.data.messages);  
                    
                    for(let msg of response.data.messages)
                    {
                        data.messages = msg;
                        await runProducer({ data, topic: 'foldersCreatedFetchEmailData' })
                    }

                    if (response.data.nextPageToken) 
                    {
                        data.nextPageToken = response.data.nextPageToken;
                        await runProducer({ topic: 'foldersCreatedFetchMails', data })
                    }
                }
            });
        
        } 
        catch (error) {
            console.log("Error at getEmailMessageList function :: ",error)
        }
    }
}