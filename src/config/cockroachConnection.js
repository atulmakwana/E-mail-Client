function createmysqlConnection({
    Client
}) {
    const cockroach = new Client({
        host: 'localhost',
        user: 'atul',
        password: 'atul',
        database: 'emailclientcockroachdb',
        port:26257,
        ssl: {
                rejectUnauthorized:false
        }
    });
    cockroach.connect(function(err){
        if(err){
            console.log("Cockroach connection error occured: ",err);
        }
        else{
            console.log("Cockroach connection succesfulll...");
        }
    });
    return cockroach
}
module.exports = createmysqlConnection;