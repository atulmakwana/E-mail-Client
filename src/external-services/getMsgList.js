module.exports = function makegetMsgList({
    client,
    google,
    axios
}){
    // code to fectch emails and store it in db
    return async function getMsgList({ userid,ACCESS_TOKEN })
    {
        try {
            client.setCredentials({
              access_token:ACCESS_TOKEN,
            });
            
            // const gmail = await google.gmail({ version:'v1', auth:client });
            // const results = await gmail.users.messages.list({userId:'me',q1:'in:inbox'});
            // const data = results.data;
            // console.log("AAAAAAAAAAAAAAAAA",data);
            
            // for(let msg of data)
            // {
            //   console.log(msg);
            // }
            
            
            // const response = await axios.get(
            //     'https://gmail.googleapis.com/gmail/v1/users/me/messages', 
            //     { 
            //       // params: queryParams = {
            //       //   maxResults: 200, // number of results to return per page
            //       //   q: 'is:unread', // example query to filter by unread messages
            //       // }, 
            //       headers : {
            //         Authorization: `Bearer ${ACCESS_TOKEN}`,
            //       }
            //     }
            //   );


            // console.log("RESPONSEEEEEEEEEE",response.data);
            
            const endpointUrl = 'https://gmail.googleapis.com/gmail/v1/users/me/messages';
            const queryParams = {
              maxResults: 20, // number of results to return per page
              // q: 'is:unread', // example query to filter by unread messages
            };
            

            const headers = {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            };
            

            async function fetchResults(nextPageToken) {
              try {

                if (nextPageToken) {
                  queryParams.pageToken = nextPageToken;
                }
            

                const response = await axios.get(endpointUrl, { params:queryParams ,headers });
                
                    // Handle the response
                    console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRR",response.data);
                

                    if (response.data.nextPageToken) {
                      await fetchResults(response.data.nextPageToken);
                    }
                  } catch (error) {
                    
                    console.error(error);
                  }
                }
                
                
                fetchResults();

            
        } 
        catch (error) {
            console.log("Error at fetchemails function :: ",error)
        }
    }
}