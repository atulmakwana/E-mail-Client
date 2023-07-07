// this handler will create email from the consumed message list of msg id
// this will call use case create email


module.exports = function makecreateEmailData({
  Kafka,
  client,
  axios,
  parseEmail,
  createEmail,
  createRecipient,
  createAttachment,
  saveAttachment
})
{
return async function createEmailData()
    {      
      try 
      {

        const kafka=new Kafka({
          clientId:'fetch-email-data',
          brokers:['localhost:9092']
        });
        const consumer = await kafka.consumer({ groupId:'myEmailDataConsumer' });
        
        await consumer.connect();
        await consumer.subscribe({ topic:'foldersCreatedFetchEmailData'});
        
        await consumer.run({
          eachMessage: async({ topic, partition, message }) => 
          {
            console.log("Message consumed at get createEmailData ::",{
              partition,
              offset: message.offset,
              value: message.value.toString()
            });  

            ACCESS_TOKEN = (JSON.parse(message.value)).ACCESS_TOKEN;
            const userid = (JSON.parse(message.value)).userid;

            const msg = (JSON.parse(message.value)).messages;
            const msgId = msg.id;
            
            client.setCredentials({
              access_token:ACCESS_TOKEN,
            });
            
            const response = await axios.get(
              `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msgId}`, 
              { 
                headers : {
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                }
              }
            );
              
              
            // console.log("**************************ORIGINAL RESPONSEEEEEEEEEE at createEmailData*************************",);
            // console.log(response.data);

            const email = parseEmail(response.data);
            
            // console.log("*************************PARSEDDDDDDDDDDD RESPONSEe at createEmailData************************",);
            // console.log(email);

            const resultedEmail = await createEmail({email,userid});
            const id = resultedEmail[0].id;
            
            if( email.headers.from )
            {
              await createRecipient({ emailname:email.headers.from, id ,emailtype:"from"});
            }
            if( email.headers.to )
            {
              let toArray = (email.headers.to).split(',');
              for(let emailname of toArray)
              {
                await createRecipient({ emailname, id ,emailtype:"to"});
              }
            }
            if( email.headers.cc )
            {
              let toArray = (email.headers.cc).split(',');
              for(let emailname of toArray)
              {
                await createRecipient({ emailname, id ,emailtype:"cc"});
              }
            }
            if( email.headers.bcc )
            {
              await createRecipient({ emailname:email.headers.bcc, id ,emailtype:"bcc"});
            }


            if( parseEmail(response.data).attachments )
            {
              let attachmentPath = '/home/ad.rapidops.com/atul.makwana/Atul-Makwana/NodeJS/Clean_Code_Architecture/src/public/attachments/';
              await attachmentFunction( {attachments:parseEmail(response.data).attachments, attachmentPath, emailid:id, msgId, ACCESS_TOKEN } )
            }
            if( parseEmail(response.data).inline )
            {
              let attachmentPath = '/home/ad.rapidops.com/atul.makwana/Atul-Makwana/NodeJS/Clean_Code_Architecture/src/public/inline-attachments/';
              await attachmentFunction( {attachments:parseEmail(response.data).inline, attachmentPath, emailid:id, msgId, ACCESS_TOKEN } )
            }
          
          }
        });
        
        
      } 
      catch (error) {
        console.log("Error at createEmailData function :: ",error)
      }
    }
    async function attachmentFunction({attachments,attachmentPath, emailid, msgId, ACCESS_TOKEN})
    {
      for(let attachment of attachments)
      {
        // console.log("AAAAAAAAAAAAttachments:: ",{ headers_value : attachment.headers   });
        
        await saveAttachment( { ACCESS_TOKEN, attachmentid:attachment.attachmentId, attachmentPath, file_name:attachment.filename, msgId });
        await createAttachment({ attachmentid:attachment.attachmentId, file_name:attachment.filename, file_type:attachment.mimeType, file_size:attachment.size, file_path:attachmentPath, emailid });
        // {attachmentid,file_name,file_type,file_size,file_path,eamil_id}
      }
    }
  }