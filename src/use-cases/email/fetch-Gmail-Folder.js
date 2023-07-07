module.exports = function makefetchGmailFolder({
    Kafka,
    client,
    google,
    createFolder,
    updateFolderProviderId,
    runProducer
}){
    return async function fetchGmailFolder({userid,ACCESS_TOKEN,REFRESH_TOKEN})
    {
        const default_folders = [ "INBOX","SENT","ARCHIVED","OUTBOX","TRASH" ];
        try{
            client.setCredentials({
                access_token:ACCESS_TOKEN,
                // refresh_token:REFRESH_TOKEN
            });

            const gmail = await google.gmail({version:'v1',auth:client});
            const results = await gmail.users.labels.list({userId:"me"});
            const data=results.data.labels;
            // console.log("Dataaaaaaaaaaaa of labels :: ",data);
            for(let item of data)
            {
                if(default_folders.includes(item.name)){
                    let updateresult = updateFolderProviderId({
                        folderuserid:userid,
                        folderproviderid:item.id,
                        foldername:item.name,
                        databasename:"emailclientcockroachdb"
                    })
                }
                else{
                    let folderresult = await createFolder({
                        foldername:item.name,
                        folderproviderid:item.id,
                        folderuserid:userid,
                        priority:1,
                        databasename:"emailclientcockroachdb"
                    });
                }
            }
            
            
            
            // publish message that now start fetching mails list for fetching message list
            const data2 = {
                message:"All required folders are created now start fetching mail list...",
                ACCESS_TOKEN,
                userid
            }
            await runProducer({ topic: 'foldersCreatedFetchMails', data:data2 });
            
        }
        catch (error) {
            console.log("Error at fetchGmailFolder function :: ",error);
        }
    }

}