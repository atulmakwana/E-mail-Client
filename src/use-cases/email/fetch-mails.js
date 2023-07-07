const axios = require('axios');

module.exports = function makefetchmails({
    client,
    google,
}){
    // code to fectch emails and store it in db
    return async function fetchmails({ userid,ACCESS_TOKEN })
    {
        try {
            client.setCredentials({
              access_token:ACCESS_TOKEN,
            });
            
            const gmail = await google.gmail({ version:'v1', auth:client });
            const results = await gmail.users.messages.list({userId:'me',q1:'in:inbox'});
            const data = results.data;
            console.log("AAAAAAAAAAAAAAAAA",data);
            
            // for(let msg of data)
            // {
            //   console.log(msg);
            // }
            
            // Make GET request to API endpoint with query parameters and headers
            const response = await axios.get(
                'https://gmail.googleapis.com/gmail/v1/users/me/messages/1877005f7b8bb3b4', 
                { 
                  // params: queryParams = {
                  //   maxResults: 200, // number of results to return per page
                  //   q: 'is:unread', // example query to filter by unread messages
                  // }, 
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