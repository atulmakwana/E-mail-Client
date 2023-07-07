module.exports = function makeCreateAttachment({
    createDbAttachment
}){
    return async function createAttachment({attachmentid,file_name,file_type,file_size,file_path,emailid})
    {
        return await createDbAttachment({attachmentid,file_name,file_type,file_size,file_path,emailid});
    }
}