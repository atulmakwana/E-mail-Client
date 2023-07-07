module.exports = function makeFolderDbMethods({connection})
{
    return Object.freeze({
        createDbEmail,
        createDbRecipient,
        createDbAttachment
    });


    async function createDbEmail({email,userid})
    {
        let result = await connection.query( `insert into emails(bodytext,bodyhtml,subject,threadid,messageid,snippet,created_at,emailuserid) values($1,$2,$3,$4,$5,$6,$7,$8) returning id`,[email.textPlain,email.textHtml,email.headers.subject,email.threadId,email.id,email.snippet,email.internalDate,userid]);
        return result.rows;
    }

    async function createDbRecipient({ emailname, id ,emailtype })
    {
        let result = await connection.query( `insert into recipients(email,email_id,emailtype) values($1,$2,$3) returning recipientid`,[emailname, id ,emailtype]);
        return result.rows;
    }

    async function createDbAttachment({attachmentid,file_name,file_type,file_size,file_path,emailid})
    {
        let result = await connection.query('insert into attachments values($1,$2,$3,$4,$5,$6)',[attachmentid,file_name,file_size,file_type,file_path,emailid]);
        return result;
    }
}