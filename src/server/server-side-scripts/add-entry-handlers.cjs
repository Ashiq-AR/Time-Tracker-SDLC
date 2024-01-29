const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const path = require('path')

let timeEntriesFilePath = path.resolve(__dirname,'../../utils/data-storage-files/time-entries.json')

/**
 * Write empty object to file if file is empty
 */
const writeEmptyObjectToFile = function (){
    let emptyObj = {}
    fs.writeFileSync(timeEntriesFilePath,JSON.stringify(emptyObj),(err)=>{
        console.error('cannot write to file');
        throw err
    })
}

/**
 * Adds task entry details in file
 * @param {object} details - taks details
 */
const addEntryDetailsInFile = function(details){
    let timerEntriesData
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(timeEntriesFilePath,(err,data)=>{
            let uuid = uuidv4()
            try{
                timerEntriesData = JSON.parse(data)
            }
            catch(err){
                writeEmptyObjectToFile()
                timerEntriesData = {}
            }
            const query = JSON.parse(details)
            if(!timerEntriesData.hasOwnProperty(query.email)){
                timerEntriesData[query.email] = {}
            }
            if(!timerEntriesData[query.email].hasOwnProperty(query.year)){
                timerEntriesData[query.email][query.year] = {}
            }
            if(!timerEntriesData[query.email][query.year].hasOwnProperty(query.month)){
                timerEntriesData[query.email][query.year][query.month] = {}
            }
            if(!timerEntriesData[query.email][query.year][query.month].hasOwnProperty(query.date)){
                timerEntriesData[query.email][query.year][query.month][query.date] = {}
            }
            if(!timerEntriesData[query.email][query.year][query.month][query.date].hasOwnProperty(query.id)){
                // timerEntriesData[query.email][query.year][query.month][query.date][uuid] = {}
                query.id = uuid
                timerEntriesData[query.email][query.year][query.month][query.date][query.id] = {}
            }
            timerEntriesData[query.email][query.year][query.month][query.date][query.id]["taskName"] = query.taskName
            timerEntriesData[query.email][query.year][query.month][query.date][query.id]["taskDescription"] = query.taskDescription
            timerEntriesData[query.email][query.year][query.month][query.date][query.id]["category"] = query.category
            timerEntriesData[query.email][query.year][query.month][query.date][query.id]["duration"] = ""
            fs.writeFile(timeEntriesFilePath, JSON.stringify(timerEntriesData) , (err)=>{
                if(err) {
                    console.error("Couldn't write file in add entry");
                    throw err
                }
            })
            entryId = {}
            entryId["date"] = query.date
            entryId["month"] = query.month
            entryId["year"] = query.year
            entryId["email"] = query.email
            entryId["id"] = query.id
            resolve(entryId)
        })
        
    })
    return promise
}

/**
 * Add the start time of a task for a particular entry
 * @param {object} query - entry details
 */
const addStartTimeForEntry = function (query){
    let timerEntriesData
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(timeEntriesFilePath,(err,data)=>{
            timerEntriesData = JSON.parse(data)
            timerEntriesData[query.email][query.year][query.month][query.date][query.id]["startTime"] = query.startTime
            fs.writeFile(timeEntriesFilePath,JSON.stringify(timerEntriesData),(err)=>{
                if(err){
                    console.log("Couldn't write start time to entries file");
                }
                resolve()
            })
        })
    })
    return promise
}

/**
 * Add the start time of a task for a particular entry
 * @param {object} query - entry details
 */
const addStopTimeForEntry = function (query){
    query = query["entryId"]
    let timerEntriesData
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(timeEntriesFilePath,(err,data)=>{
            if(err){
                console.error("Cannot read time entries file");
                throw err
            }
            timerEntriesData = JSON.parse(data)
            timerEntriesData[query.email][query.year][query.month][query.date][query.id]["stopTime"] = query.stopTime
            fs.writeFile(timeEntriesFilePath,JSON.stringify(timerEntriesData),(err)=>{
                if(err){
                    console.log("Couldn't write stop time to entries file");
                }
                resolve()
            })
        })
    })
    return promise
}

/**
 * Adds a time stamp start or end time in file
 * @param {object} query - the requested query detials
 * @param {string} timeStamp - specifies start or end of a time stamp
 * @param {string} slotTime - the start or end time
 * @returns the promise details
 */
const addTimeStamp = function(query,timeStamp,slotTime){
    let timerEntriesData
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(timeEntriesFilePath,(err,data)=>{
            let timeslot = {}
            timerEntriesData = JSON.parse(data)
            if(timeStamp == "start"){
                if(!timerEntriesData[query.email][query.year][query.month][query.date][query.id]["timeSlots"]){
                    timerEntriesData[query.email][query.year][query.month][query.date][query.id]["timeSlots"] = []
                }
                timeslot['startTime'] = slotTime
                timerEntriesData[query.email][query.year][query.month][query.date][query.id]["timeSlots"].push(timeslot)
            }
            else{
                timeslot = timerEntriesData[query.email][query.year][query.month][query.date][query.id]["timeSlots"].pop()
                timeslot["endTime"] = slotTime
                timerEntriesData[query.email][query.year][query.month][query.date][query.id]["timeSlots"].push(timeslot)
            }
            fs.writeFile(timeEntriesFilePath,JSON.stringify(timerEntriesData),(err)=>{
                if(err){
                    console.log("Couldn't write to file");
                }
                resolve()
            })
        })
    })
    return promise
}

module.exports = {
    writeEmptyObjectToFile ,
    addEntryDetailsInFile ,
    addStartTimeForEntry ,
    addStopTimeForEntry ,
    addTimeStamp
}