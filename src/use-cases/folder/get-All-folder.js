function makegetAllFolder({
    getAllDbFolder
})
{
    return async function getAllFolder({databasename})
    {
        return await getAllDbFolder({databasename});
    }
}

module.exports = makegetAllFolder;