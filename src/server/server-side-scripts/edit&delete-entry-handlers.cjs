const fs = require('fs')
const path = require('path')

const timeEnriesFilePath = path.resolve(__dirname,'../../utils/data-storage-files/time-entries.json')

/**
 * Delete an entry in the file
 * @param {object} entryDetails - details of a time entry
 */
const deleteEntry = function (entryDetails){
    let timeEntries = JSON.parse(fs.readFileSync(timeEnriesFilePath))
    delete timeEntries[entryDetails.email][entryDetails.year][entryDetails.month][entryDetails.date][entryDetails.entryId]
    fs.writeFileSync(timeEnriesFilePath,JSON.stringify(timeEntries))
}

/**
 * Clears all time stamps of an entry in file
 * @param {object} entryDetails - the details of a time entry
 */
const clearTimeStamps = function(entryDetails){
    let timeEntries = JSON.parse(fs.readFileSync(timeEnriesFilePath))
    timeEntries[entryDetails.email][entryDetails.year][entryDetails.month][entryDetails.date][entryDetails.entryId].timeSlots = []
    fs.writeFileSync(timeEnriesFilePath,JSON.stringify(timeEntries))
}

module.exports = {
    deleteEntry,
    clearTimeStamps
}