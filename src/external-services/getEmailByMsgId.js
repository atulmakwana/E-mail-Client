module.exports = function makegetEmailByMsgId({
    client,
    google,
    axios
}){
    return async function getEmailByMsgId({ userid,ACCESS_TOKEN })
    {
        try {
            client.setCredentials({
              access_token:ACCESS_TOKEN,
            });
            
            
            const response = await axios.get(
                'https://gmail.googleapis.com/gmail/v1/users/me/messages/1877005f7b8bb3b4', 
                { 
                  headers : {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                  }
                }
              );


              console.log("RESPONSEEEEEEEEEE",response.data);
            
        } 
        catch (error) {
            console.log("Error at fetchemails function :: ",error)
        }
    }
}