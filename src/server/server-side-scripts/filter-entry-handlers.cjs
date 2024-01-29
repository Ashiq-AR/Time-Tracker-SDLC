const fs = require('fs')
const path = require('path')

const timeEntriesFilePath = path.join(__dirname,'../../utils/data-storage-files/time-entries.json')

/**
 * Gets the time entries filtered based on given date from the data file
 * @param {object} entryParams - the query object containing input request parameters
 * @returns - the entries filtered based on given date input
 */
const getEntriesForDate = function(entryParams){
    const timeEntries = JSON.parse(fs.readFileSync(timeEntriesFilePath))
    const email = entryParams.email
    const date = entryParams.inputValue.split('-')
    try{
        return timeEntries[email][date[0]][date[1]][date[2]]
    }
    catch(err){
        return 'not found'
    }
}

/**
 * Gets the time entries filtered based on given month from the data file
 * @param {object} entryParams - the query object containing input request parameters
 * @returns - the entries filtered based on given month input
 */
const getEntriesForMonth = function(entryParams){
    const timeEntries = JSON.parse(fs.readFileSync(timeEntriesFilePath))
    const email = entryParams.email
    const yearAndMonth = entryParams.inputValue.split('-')
    try{
        return timeEntries[email][yearAndMonth[0]][yearAndMonth[1]]
    }
    catch(err){
        return 'not found'
    }
}

/**
 * Fetch and returns a particular details of an entry
 * @param {object} entryParams - the details of a time entry
 * @returns the fetched entry else not found
 */
const fetchAnEntry = function(entryParams){
    const timeEntries = JSON.parse(fs.readFileSync(timeEntriesFilePath))
    try{
        return timeEntries[entryParams.email][entryParams.year][entryParams.month][entryParams.date][entryParams.entryId]
    }
    catch(err){
        return 'not found'
    }
}

module.exports = {
    getEntriesForDate,
    getEntriesForMonth,
    fetchAnEntry
}