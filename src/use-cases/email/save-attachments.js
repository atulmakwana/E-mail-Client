module.exports = function makesaveAttachment({
    fs,
    google,
    client,
    axios,
    OAuth2Client,
})
{
    return async function saveAttachment({ attachmentid,attachmentPath,file_name,msgId })
    {
        client.setCredentials({
            access_token:ACCESS_TOKEN,
        });
        
        const gmail = google.gmail({version:'v1',auth:OAuth2Client});
        const attachmentData = await axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msgId}/attachments/${attachmentid }`, 
          { 
            headers : {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            }
          }
        );
        const buffer = Buffer.from((attachmentData.data).data,'base64');

        attachmentPath += file_name;
        
        fs.writeFile(attachmentPath, buffer, function (err) {
            if (err) {
              console.error("ERROR WHILE SAVING ATTACHMENT at :: ",err);
              return;
            }
            console.log(`Attachment successfully stored at ${attachmentPath}`);
          });

    }
}









/*

  client.setCredentials({
    access_token:ACCESS_TOKEN,
  });

  const gmail = google.gmail({version:'v1',auth:OAuth2Client});
  for(let attachment of parseEmail(response.data).attachments)
  {
    console.log("AAAAAAAAAAAAttachments:: ",{ headers_value : attachment.headers   });
    // const attachmentData = await gmail.users.messages.attachments.get({ userId: 'me', messageId:email.id, id: attachment.attachmentId });
    const attachmentData = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msgId}/attachments/${attachment.attachmentId }`, 
      { 
        headers : {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
      }
    );
    // console.log(`Downloading attachment....`,attachmentData);
    const data = attachmentData.data;
    const size = attachmentData.data.size;
    const buffer = Buffer.from(data.data,'base64');
    const fileName = attachment.filename;
    let attachmentPath ;

    attachmentPath = '/home/ad.rapidops.com/atul.makwana/Atul-Makwana/NodeJS/Clean_Code_Architecture/src/public/attachments/' + fileName;

    fs.writeFile(attachmentPath, buffer, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Attachment stored in ${attachmentPath}`);
    });

  }
*/