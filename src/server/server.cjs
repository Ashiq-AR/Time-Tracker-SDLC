const express = require('express')
const path = require('path')
const loginSignupHandlers = require('./server-side-scripts/login-signup-handlers.cjs')

const app = express()
const port = 3000

/**
 * Use of middle wares
 */
app.use(express.static(path.join(__dirname,'../'),{
    index:"login-signup-files/login-signup.html"
}))
app.use(express.json())
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
        res.redirect('../../index.html')
    }
    else{
        res.send(result)
    }
})

/**
 * Handle request to sign up
 */
app.post('/signup', async (req,res)=>{
    let statusMessage = await loginSignupHandlers.addNewUser(req.body)
    if(statusMessage == 'Signed Up successfully'){
        console.log("Signed Up successfull..");
        res.redirect('../../index.html')
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
 * Listen for any request in port
 */
app.listen(port , ()=>{
    console.log("Listening to port "+port);
})