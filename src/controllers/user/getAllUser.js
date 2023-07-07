module.exports = function makegetAllUserAction({
    getAllUser
})
{
    return async function getAllUserAction(req,res)
    {
        try{
            console.info(`At getAllUserAction :: ${req.headers.databasename} `);
            let result=await getAllUser({databasename:req.headers.databasename});
            console.log(result);
            res.status(200).send(result);
        }
        catch(error){
            console.info(`ERROR at getAllUserAction :: ${error.message} :: ${error.stack}`);
            res.status(400).send(error.message);
        }
    }
}