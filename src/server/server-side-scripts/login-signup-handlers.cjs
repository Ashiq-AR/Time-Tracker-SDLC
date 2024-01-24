const fs = require('fs')
const path = require('path')
const addEntryHandlers = require('./add-entry-handlers.cjs')

let usersFilePath = path.resolve(__dirname,'../../utils/data-storage-files/users.json')

/**
 * The authenticate user login from file
 * @param {string} email - E mail of the user
 * @param {string} password - password of the user
 * @returns promise that resolves on successfull login
 */
const authenticateLogin = function (email,password){
    let usersData 
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(usersFilePath,(err,data)=>{
            usersData = JSON.parse(data)
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
 * Adds a new user upon signup
 * @param {object} query - user details for signup
 * @returns promise that resolves on successfull addition to file
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
            usersData = JSON.parse(data)
            if(!usersData.hasOwnProperty(query.email)){
                usersData[query.email] = {}
                usersData[query.email]["email"] = query.email
                usersData[query.email]["username"] = query.username
                usersData[query.email]["password"] = query.password
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