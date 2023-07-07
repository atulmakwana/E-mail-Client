const { Given,When,Then,After,Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;

const sandbox = sinon.createSandbox();

const makegetAllUser = require('./get-All-User')

Before(()=>{
    this.result = undefined;
    this.error = undefined;
})

const userDb = {
    getAllDbUser:function(){}
}
const getAllDbUserStub = sandbox.stub(userDb,'getAllDbUser');

getAllDbUserStub.callsFake((args)=>{
    console.log("In the getAllDbUserStub.callsFake");
    return '[]';
})
Given("Getting All the users",()=>{
    console.log("Given getting all the users");
});

When("Try to get all the users",async ()=>{
    const getAllUser = makegetAllUser({
        getAllDbUser : userDb.getAllDbUser
    });

    try{
        this.result = await getAllUser();
    }
    catch(e){
        console.log("Error in Whennn: ",e);
        this.error = e
    }
})


Then('The result is : {string} for getting all users',(result)=>{
    console.log("aaaaaaa: ",result,typeof result);
    console.log("AAAAAAA:",this.result, typeof this.result);
    expect(this.result).deep.equal(result);
})
