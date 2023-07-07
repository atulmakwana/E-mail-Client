const CronJob = require('cron').CronJob;
const { Kafka } = require('kafkajs');
const { user,kafka } = require('../use-cases');

const getAllRelatedUser = user.getAllRelatedUser;
const databasename = "emailclientcockroachdb";

const runProducer = kafka.runProducer;

function runCron()
{
    const job = new CronJob('*/30 * * * *',async function() 
    {
        const current_time=new Date().getTime();
        let relatedusers = await getAllRelatedUser({current_time,databasename});
        
        await runProducer({topic: 'userCreatedAccessToken2', data:relatedusers});
    });
    
    job.start();
}



runCron();