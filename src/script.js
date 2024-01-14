import * as domUtils from './utils/dom-utils.js'
import * as uiManipulators from './js-files/ui-manipulators.js'
import * as addEntryHandlers from './js-files/add-entry-handlers.js'
import * as unitFunctions from './js-files/unit-functions.js'
import * as updateEntryHandlers from './js-files/update-entry-handlers.js'
import * as timerHandlers from './js-files/timer-handlers.js'

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
        details['month'] = parseInt(dateObj.getMonth()) + 1
        details['year'] = dateObj.getFullYear()
        console.log(details);
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
    console.log(email);
    return email
}

/**
 * Show details to add manual entry
 */
domUtils.addManualEntry.onclick = function(){
    uiManipulators.displayManualEntryForm()
    document.getElementById('add-time-stamp').onclick = function(){
        uiManipulators.addTimeStampInUiForm()
        for(const deleteTimeStamp of document.getElementsByClassName("delete-time-stamp")){
            deleteTimeStamp.onclick = function(event){
                uiManipulators.deleteElementInUi(event.target.parentNode)
            }
        }
    }
}