module.exports = function makeUserTopicsMethods({ connection })
{
    return Object.freeze({
        getDbUserTopic,
        insertDbUserTopic,
        deleteDbUserTopic
    });

    async function insertDbUserTopic({id,tenant})
    {
        let result = await connection.query('insert into usertopics(id,tenant) values($1,$2) RETURNING id',[id,tenant]);
        return result.rows;
    }
    async function getDbUserTopic({id})
    {
        let result = await connection.query('select * from usertopics where id=$1 ',[id]);
        return result.rows;
    }
    async function deleteDbUserTopic({id})
    {
        let result = await connection.query('delete from usertopics where id=$1 ',[id]);
        return result;
    }
}