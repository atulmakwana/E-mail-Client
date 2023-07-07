module.exports = function makegetAllFolderAction({
    getAllFolder
})
{
    return async function getAllFolderAction(req,res)
    {
        try{
            console.info(`At getAllFolderAction ${req.headers.databasename}`);
            let result = await getAllFolder({databasename:req.headers.databasename});
            console.log(result);
            res.status(200).send(result);
        }
        catch(error){
            console.info(`ERROR at getAllFolderAction :: ${error.message} :: ${error.stack}`);  
            res.status(400).send(error.message);
        }
    }
}