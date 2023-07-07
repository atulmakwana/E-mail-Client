module.exports = function makeproducer({
    Kafka,
    createUserTopic,
    insertDbUserTopic
}){
    return async function runProducer({topic,data})
    {
        console.log("*****************************PRODUCERRRRRRR**********************************")
        console.log("DDDDDDDDDDAAAAAAATAAAAAAA:::::",data,topic);

        const kafka = new Kafka({
            clientId:`producer-${topic}`,
            brokers:['localhost:9092']
        });
        const producer = kafka.producer();
        await producer.connect();
        await producer.send({
            topic: topic,
            messages:[
                {
                    value : JSON.stringify(data)
                }
            ]
        });
        let id;
        if(data.messages){
            id =  `${data.userid}-${data.messages.id}-${topic}`
        }
        else{
            id =  `${data.userid}-${topic}`
        }
        console.log("AAAAAAAAAAAAAAIDDDDDDDDdddddddddddd",id);
        console.log("INSIDE TYPEE::createUserTopic::",typeof(createUserTopic))
        console.log("INSIDE TYPEE::insertDbUserTopic::",typeof(insertDbUserTopic))

        // await createUserTopic({ id,tenant:"emailclientcockroachdb" })
        // await insertDbUserTopic({ id,tenant:"emailclientcockroachdb" })
    }
}