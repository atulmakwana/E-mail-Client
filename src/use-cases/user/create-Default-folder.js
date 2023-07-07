function makecreateDefaultFolder({
    Kafka,
    createDbFolder
})
{ 
    return async function createDefaultFolders({ userid })
    {
        const kafka=new Kafka({
            clientId:'user-default-folder-producer',
            brokers:['localhost:9092']
        });
        const consumer = kafka.consumer({ groupId:'myFoldersConsumer' });
        
        await consumer.connect();
        await consumer.subscribe({ topic:'userCreatedFolders2'});

        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("Message consumed at createDefaultFolderHandler :: ",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString()
                });

                let foldersArr = [ 'OUTBOX','ARCHIVED','SENT','INBOX','TRASH' ];
                let pr;
                for(let index in foldersArr)
                {
                    if( foldersArr[index]=='SENT' || foldersArr[index]=='INBOX'  ){
                        pr=index;
                    }
                    else{
                        pr=1;
                    }
                    const args = {
                        foldername:foldersArr[index],
                        folderuserid:userid,
                        providerfolderid:null,
                        priority:pr,
                        databasename:'emailclientcockroachdb'
                    }
                    await createDbFolder(args)
                }
                
            }
        })
        
    }
}
module.exports = makecreateDefaultFolder;