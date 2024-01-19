import * as domUtils from './utils/dom-utils.js'
import * as uiManipulators from './js-files/ui-manipulators.js'
import * as addEntryHandlers from './js-files/add-entry-handlers.js'
import * as unitFunctions from './js-files/unit-functions.js'
import * as updateEntryHandlers from './js-files/update-entry-handlers.js'
import * as timerHandlers from './js-files/timer-handlers.js'
import * as timeHandlers from './js-files/time-handlers.js'

let details = {}
let timerStatus = 'stopped'
let duration = 0
let runTimerInterval
let isAddedDetails = false
let isStart = true
let entryId

uiManipulators.addTaskDescriptionPopUpOnClick()

/**
 * Adds a new entry in file
 */
domUtils.addDetails.onclick = function (){
    let form = uiManipulators.displayDetailsForm()
    document.getElementById('submit-details').onclick = async function(){
        let dateObj = new Date()
        details = addEntryHandlers.getDetails()
        details["email"] = getEmailOfUser()
        details['date'] = dateObj.getDate()
        details['month'] = unitFunctions.paddZeroIfSingleDigit(parseInt(dateObj.getMonth()) + 1)
        details['year'] = dateObj.getFullYear()
        uiManipulators.cancelPopup(form)
        entryId = await addEntryHandlers.addEntryDetailsInFile(details)
        if(entryId){
            uiManipulators.addEntryInUi(details.taskName,details.taskDescription,details.category,"--:--:--","--:--:--","--:--:--",unitFunctions.formatDate(details["date"],details["month"],details["year"]))
            uiManipulators.addTaskDescriptionPopUpOnClick()
            isAddedDetails = true
        }
    }
}

uiManipulators.showIconOnTimerStatus(timerStatus)

/**
 * Starts the timer and adds start time to file
 */
domUtils.startTimer.onclick = async function (){
    if(timerStatus == 'paused' || timerStatus == 'stopped'){
        if(isAddedDetails){
            let date = new Date()
            let time = unitFunctions.militaryTimeToMeridiamTime(date.getHours(),date.getMinutes(),date.getSeconds())
            if(isStart){
                await addEntryHandlers.addStartTimeForEntry(entryId,time)
                unitFunctions.getLastElementOfAnIterator(domUtils.start).innerHTML = time
                isStart = false
            }
            await addEntryHandlers.addTimeStamp(entryId,"start",time)
            timerStatus = 'running'
            uiManipulators.showIconOnTimerStatus(timerStatus)
            runTimer()
        }
        else{
            alert('Please add details first..')
        }
    }
}

/**
 * Pauses the timer and adds time stamp to file
 */
domUtils.pauseTimer.onclick = async function (){
    let dateObj = new Date()
    let time = unitFunctions.militaryTimeToMeridiamTime(dateObj.getHours(),dateObj.getMinutes(),dateObj.getSeconds())
    if(timerStatus == 'running'){
        timerStatus = 'paused'
        await addEntryHandlers.addTimeStamp(entryId,"end",time)
        clearInterval(runTimerInterval)
        uiManipulators.showIconOnTimerStatus(timerStatus)
    }
}

/**
 * Stops the timer and adds the entry to file
 */
domUtils.stopTimer.onclick = async  function (){
    if(timerStatus == 'running' || timerStatus == 'paused'){
        let date = new Date()
        let time = unitFunctions.militaryTimeToMeridiamTime(date.getHours(),date.getMinutes(),date.getSeconds())
        let formatedDuration = timerHandlers.formatDuration(duration)
        // add end time of time slot if running i,e not encountered pause
        if(timerStatus == 'running'){
            await addEntryHandlers.addTimeStamp(entryId,"end",time)
        }
        await updateEntryHandlers.updateDetail("duration",entryId,formatedDuration)
        unitFunctions.getLastElementOfAnIterator(domUtils.totalDuration).innerHTML = formatedDuration
        duration = 0
        uiManipulators.showRunningTimer(duration)
        clearInterval(runTimerInterval)
        await addEntryHandlers.addStopTimeForEntry(entryId,time)
        unitFunctions.getLastElementOfAnIterator(domUtils.end).innerHTML = time
        isAddedDetails = false
        timerStatus = 'stopped'
        isStart = true
        uiManipulators.showIconOnTimerStatus(timerStatus)
    }
}


/**
 * Runs the timer
 * @param {string} duration - duration in seconds
 */
const runTimer = function (){
    runTimerInterval = setInterval(() => {
        duration++
        uiManipulators.showRunningTimer(duration)
    }, 1000);
}

/**
 * Gives the email of the user from the url query
 * @returns email id of the user
 */
const getEmailOfUser = function(){
    let email = window.location.search.slice(7)
    return email
}

/**
 * Show details to add manual entry
 */
domUtils.addManualEntry.onclick = function(){
    const form = uiManipulators.displayManualEntryForm()
    document.getElementById('add-time-stamp').onclick = function(){
        uiManipulators.addTimeStampInUiForm()
        for(const deleteTimeStamp of document.getElementsByClassName("delete-time-stamp")){
            deleteTimeStamp.onclick = function(event){
                uiManipulators.deleteElementInUi(event.target.parentNode)
            }
        }
    }
    document.getElementById("submit-details").onclick = async function(){
        let entryDetails,startTime,stopTime,duration,isStartTimeLess
        const details = addEntryHandlers.getDetails()
        let fullDate
        if(document.getElementById("date").value == ''){
            let dateObj = new Date()
            fullDate = unitFunctions.formatDate(dateObj.getDate(),parseInt(dateObj.getMonth())+1,dateObj.getFullYear()).split('/')
            fullDate.reverse()
        }
        else {
            fullDate = document.getElementById("date").value.split('-')
        }
        startTime = timeHandlers.getFormatedTimeFromManualEntryForm("start-time")
        stopTime = timeHandlers.getFormatedTimeFromManualEntryForm("stop-time")
        if(unitFunctions.validateGreaterTime(timeHandlers.separateHrsMinsSecsFromFormatedTime(startTime),timeHandlers.separateHrsMinsSecsFromFormatedTime(stopTime))){
            const numberOfTimeStamps = document.getElementById('time-stamps-container').children.length
            for(let i=0;i<numberOfTimeStamps;i++){
                let hours = document.getElementsByClassName('start-time-stamp-hours')[i].value
                let minutes = document.getElementsByClassName('start-time-stamp-minutes')[i].value
                let seconds = document.getElementsByClassName('start-time-stamp-seconds')[i].value
                let meridiam = document.getElementsByClassName('start-time-stamp-meridiam')[i].value
                let startTime = unitFunctions.formatTime(hours,minutes,seconds,meridiam)
                hours = document.getElementsByClassName('stop-time-stamp-hours')[i].value
                minutes = document.getElementsByClassName('stop-time-stamp-minutes')[i].value
                seconds = document.getElementsByClassName('stop-time-stamp-seconds')[i].value
                meridiam = document.getElementsByClassName('stop-time-stamp-meridiam')[i].value
                let stopTime = unitFunctions.formatTime(hours,minutes,seconds,meridiam)
                if(unitFunctions.validateGreaterTime(timeHandlers.separateHrsMinsSecsFromFormatedTime(startTime),timeHandlers.separateHrsMinsSecsFromFormatedTime(stopTime))){
                        isStartTimeLess = true
                }
                else{
                    alert("Make sure start time is less than end time in all time stamps")
                    isStartTimeLess = false
                    break
                }
            }
            details["email"] = getEmailOfUser()
            details["date"] = fullDate[2]
            details["month"] = fullDate[1]
            details["year"] = fullDate[0]
            entryDetails = await addEntryHandlers.addEntryDetailsInFile(details)
            duration = timeHandlers.calculateDurationFromStartEndTime(startTime,stopTime)
            await updateEntryHandlers.updateDetail("duration",entryDetails,duration)
            await addEntryHandlers.addStartTimeForEntry(entryDetails,startTime)
            await addEntryHandlers.addStopTimeForEntry(entryDetails,stopTime)
            if(isStartTimeLess){
                await addEntryHandlers.addTimeStamp(entryDetails,"start",startTime)
                await addEntryHandlers.addTimeStamp(entryDetails,"end",stopTime)
            }
            uiManipulators.cancelPopup(form)
        }
        else{
            alert('Start time is greater than or equal to end time')
        }
    }
}
