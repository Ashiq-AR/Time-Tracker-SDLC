const express = require('express')
const path = require('path')
const loginSignupHandlers = require('./server-side-scripts/login-signup-handlers.cjs')
const addEntryHandlers = require('./server-side-scripts/add-entry-handlers.cjs')
const updateEntryHandlers = require('./server-side-scripts/update-entry-handlers.cjs')

const app = express()
const port = 3000

/**
 * Use of middle wares
 */
app.use(express.static(path.join(__dirname,'../'),{
    index:"login-signup-files/login-signup.html"
}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'../','../')))
app.use(express.static(path.join(__dirname,'../','login-signup-files/')))
app.use(express.urlencoded({extended:false}))

/**
 * Handle request to login
 */
app.post('/login',async (req,res)=>{
    const query = req.body
    let result = await loginSignupHandlers.authenticateLogin(query.email,query.password) 
    if(result == 'User exists and authenticated'){
        console.log("Logged In successfully...")
        res.redirect('../../index.html'+'?email='+query.email)
    }
    else{
        res.send(result)
    }
})

/**
 * Handle request to sign up
 */
app.post('/signup', async (req,res)=>{
    let query = req.body
    let statusMessage = await loginSignupHandlers.addNewUser(query)
    if(statusMessage == 'Signed Up successfully'){
        console.log("Signed Up successfull..");
        res.redirect('../../index.html'+'?email='+query.email)
    }
    else if(statusMessage == 'User already exists'){
        console.log(statusMessage);
        res.redirect('../../index.html')
    }
    else{
        console.log(statusMessage);
        res.status(200).send(statusMessage)
    }
})

/**
 * Handle request for addding entry with basic details
 */

app.post('/add-details', async (req,res)=>{
    let query = req.body
    let entryId = await addEntryHandlers.addEntryDetailsInFile(JSON.stringify(query))
    if(entryId){
        console.log('written successfull');
        res.status(200).json(entryId)
    }
    else {
        res.status(500).send("couldn't write entry")
    }
})

/**
 * Handle request to add start time for a particular task
 */
app.post('/add-start-time',async (req,res)=>{
    let query = req.body
    await addEntryHandlers.addStartTimeForEntry(query)
    res.status(200).send("successfull")
})

/**
 * Handle request to add stop time for a particular task
 */
app.post('/add-stop-time',async (req,res)=>{
    let query = req.body
    await addEntryHandlers.addStopTimeForEntry(query)
    res.status(200).send("successfull")
})

/**
 * Handle requests to add a start or end time stamp in file
 */
app.post('/add-time-stamp',async (req,res)=>{
    let entryDetails = req.body
    let timeStamp = entryDetails.timeStamp
    let slotTime = entryDetails.slotTime
    try{
        await addEntryHandlers.addTimeStamp(entryDetails,timeStamp,slotTime)
        res.status(200).send("successfull")
    }
    catch(err){
        console.log("Couldn't add time stamp");
        throw err
    }
})

/**
 * Handles requests to update any information in the file
 */
app.post('/update-detail', async (req,res)=>{
    let entryDetails = req.body
    await updateEntryHandlers.updateDetail(entryDetails.detail,entryDetails)
    res.status(200).send("successfull")
})

/**
 * Listen for any request in port
 */
app.listen(port , ()=>{
    console.log("Listening to port "+port);
})
