function createmysqlConnection({
    mysql
}) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        // database: databasename,
        waitForConnections: true,
        connectionLimit : 10,
        queueLimit : 0
    });
    connection.connect(function(err){
        if(err){
            console.log("MySQL connection error occureddd: ",err);
        }
        else{
            console.log("MySQL connection succesfulll...");
        }
    });
    return connection.promise()
}
module.exports = createmysqlConnection;