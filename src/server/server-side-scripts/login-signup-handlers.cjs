const fs = require('fs')
const path = require('path')
let usersFilePath = path.resolve(__dirname,'../../utils/data-storage-files/users.json')

/**
 * Verify login by checking user details exists in users data
 * @param {string} email - E mail ID of the user
 * @param {string} password - respective password
 * @returns promise that resolves to login successfull or not
 */
const authenticateLogin = function (email,password){
    let usersData 
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(usersFilePath,(err,data)=>{
            try{
                usersData = JSON.parse(data)
            }
            catch(err){
                usersData = {}
            }
            if(email in usersData){
                if(usersData[email]["password"] == password){
                    resolve("User exists and authenticated")
                }
                else{
                    resolve("Password is wrong")
                }
            }
            else{
                resolve("Email does not exist")
            }
        })
    })
    return promise
}

/**
 * Add a new user in users data
 * @param {object} query - user details 
 * @returns promise that resolves to successfull signup
 */
const addNewUser = function (query){
    let statusMessage
    let usersData
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(usersFilePath,(err,data)=>{
            if(err){
                console.log("Cannot read file");
                statusMessage = "Cannot read file"
                resolve(statusMessage)
            }
            try{
                usersData = JSON.parse(data)
            }
            catch(err){
                usersData = {}
            }
            if(!usersData.hasOwnProperty(query.email)){
                usersData[query.email] = {}
                usersData[query.email]["email"] = query.email
                usersData[query.email]["username"] = query.username
                usersData[query.email]["password"] = query.password
                console.log(usersData);
                fs.writeFile(usersFilePath,JSON.stringify(usersData),(err)=>{
                    if(err){
                        console.log("Couldn't write to users.json file");
                        throw err
                    }
                    console.log("Written successfully to users.json");
                    statusMessage = "Signed Up successfully"
                    resolve(statusMessage)
                })
            }
            else{
                console.log("User already exists..");
                statusMessage = "User already exists"
                resolve(statusMessage)
            }
        })
    })
    return promise
}

module.exports = {
    authenticateLogin ,
    addNewUser
}