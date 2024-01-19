import * as unitFunctions from './unit-functions.js'

/**
 * Returns the formated time for needed entity
 * @param {string} name - the needed time
 * @returns The specified time formated
 */
export const getFormatedTimeFromManualEntryForm = function(name){
    const hours = document.getElementById(name+"-hours").value
    const minutes = document.getElementById(name+"-minutes").value
    const seconds = document.getElementById(name+"-seconds").value
    const meridiam = document.getElementById(name+"-meridiam").value
    return unitFunctions.formatTime(hours,minutes,seconds,meridiam)
}

/**
 * Returns the duration between start time and end time
 * @param {string} startTime - the start time of an entry
 * @param {string} endTime - the end time of an entry
 * @returns the duration between start and end time
 */
export const calculateDurationFromStartEndTime = function(startTime,endTime){
   const startTimeObject = separateHrsMinsSecsFromFormatedTime(startTime)
   const endTimeObject = separateHrsMinsSecsFromFormatedTime(endTime)
   if(startTimeObject.meridiam != endTimeObject.meridiam){
    endTimeObject.hrs+=12
   }
   const hours = endTimeObject.hrs - startTimeObject.hrs
   endTimeObject.mins = (endTimeObject.mins < startTimeObject.mins) ? endTimeObject.mins+60 : endTimeObject.mins
   const minutes = endTimeObject.mins - startTimeObject.mins
   endTimeObject.secs = (endTimeObject.secs < startTimeObject.secs) ? endTimeObject.secs+60 : endTimeObject.secs
   const seconds = endTimeObject.secs - startTimeObject.secs
   return unitFunctions.formatTime(hours,minutes,seconds)
}

/**
 * Extracts and returns the hours,minutes and seconds as object for given formated time
 * @param {string} time - the formated time
 * @returns object with hours,minutes and seconds
 */
export const separateHrsMinsSecsFromFormatedTime = function(time){
    let timeObject = {}
    let secondsWithMeridiam
    [timeObject.hrs,timeObject.mins,secondsWithMeridiam] = time.split(':');
    [timeObject.secs,timeObject.meridiam] = secondsWithMeridiam.split(' ')
    const key = Object.keys(timeObject)
    for(let i=0;i<key.length-1;i++){
        timeObject[key[i]] = parseInt(timeObject[key[i]])
    }
    return timeObject
}