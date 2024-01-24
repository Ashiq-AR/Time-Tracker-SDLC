const fs = require('fs')
const path = require('path')

let timeEntriesFilePath = path.resolve(__dirname,'../../utils/data-storage-files/time-entries.json')

/**
 * Updates an information in the file
 * @param {string} detail - type of information or title
 * @param {object} entryDetails - the details regarding the information
 * @returns the promise details
 */
const updateDetail = function(detail,entryDetails){
    let timerEntriesData
    let promise = new Promise((resolve,reject)=>{
        fs.readFile(timeEntriesFilePath,(err,data)=>{
            if(err) throw err
            timerEntriesData = JSON.parse(data)
            timerEntriesData[entryDetails.email][entryDetails.year][entryDetails.month][entryDetails.date][entryDetails.id][detail] = entryDetails.duration
            fs.writeFile(timeEntriesFilePath,JSON.stringify(timerEntriesData),(err)=>{
                if (err) console.log("Couldn't write duration to file")
                resolve("Written duration successfully...")
            })
        })
    })
    return promise
}

module.exports = {
    updateDetail
}