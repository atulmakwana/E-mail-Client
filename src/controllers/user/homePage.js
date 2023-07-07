module.exports = function makehomePageAction()
{
    return function homePageAction(req,res)
    {
        try{
            console.info(`At homePageAction :: `);
            res.status(200).send("USER HOMEPAGE BROTHER");
        }
        catch(error){
            console.info(`ERROR at homePageAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error.message);
        }
    }
}