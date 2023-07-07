const express = require('express');
const app=express();

app.use(express.json());

const { router, init } =require('./rest-services')

init();

app.use('/',router);

app.listen(3001,() => {
    console.log("Listening on 3001...");
})