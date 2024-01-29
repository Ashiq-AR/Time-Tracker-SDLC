import * as updateEntryHandlers from './update-entry-handlers.js'
import * as timeHandlers from './time-handlers.js'
import * as uiManipulators from './ui-manipulators.js'
import * as unitFunctions from './unit-functions.js'
import {getEmailOfUser} from './user-handlers.js';
import { clearTimeStampsInFile } from './edit&delete-entry-handlers.js';

/**
 * Returns the task details entered
 * @returns The selected details from the task input as an object
 */
export const getDetails = function(){
    const details = {}
    let taskNameInput = document.getElementById('task-name-input')
    let taskDescriptionInput = document.getElementById('task-description-input')
    let categoryInput = document.getElementById('category-input')
    details["taskName"] = taskNameInput.value
    details["taskDescription"] = taskDescriptionInput.value
    details["category"] = categoryInput.value
    return details
}

/**
 * Returns true if all the details are entered in task details form
 * @param {string} taskName - name for a task
 * @param {string} taskDescription - elaborate description of the task
 * @param {string} category - category type for a task
 * @returns true if form inputs is not empty else false
 */
const validateFormDetailsNotEmpty = function(taskName,taskDescription,category){
    if(taskName == ''){
        alert("Enter Task Name")
        return false
    }
    else if(taskDescription == ''){
        alert("Enter task description")
        return false
    }
    else if(category == ''){
        alert("Enter category")
        return false
    }
    else return true
}

/**
 * Add time entry in the backend file
 * @param {object} details - contains task details
 */
export const addEntryDetailsInFile = async function (details){
    let response = await fetch('/add-details',{
        method : "POST" ,
        headers : {
            'Content-Type' : "application/json"
        } , 
        body : JSON.stringify(details)
    })
    let entryId = await response.json()
    return entryId
}

/**
 * Add start time to file for a particular task
 * @param {object} entryId - Entry details
 * @param {string} startTime - Start time of a particular task
 */
export const addStartTimeForEntry = async function (entryId,startTime){
    entryId["startTime"] = startTime
    let response = await fetch('/add-start-time',{
        method: "POST" ,
        headers : {
            "Content-Type" : "application/json"
        } ,
        body : JSON.stringify(entryId)
    })
    return response
}

/**
 * Add stop time to file for a particular task
 * @param {object} entryId - Entry details
 * @param {string} stopTime - Stop time of a particular task
 */
export const addStopTimeForEntry = async function (entryId,stopTime){
    entryId["stopTime"] = stopTime
    let response = await fetch('/add-stop-time',{
        method: "POST" ,
        headers : {
            "Content-Type" : "application/json"
        } ,
        body : JSON.stringify({entryId})
    })
    return response
}

/**
 * Adds the start and end time stamp for an entry
 * @param {object} entryDetails - The details of a time entry
 * @param {string} timeStamp - specifies start or end of a time stamp
 * @param {string} time - the formated time
 * @returns the response details of whether entry added or not in file
 */
export const addTimeStamp = async function (entryDetails,timeStamp,time){
    entryDetails["timeStamp"] = timeStamp
    entryDetails["slotTime"] = time
    let response = await fetch('/add-time-stamp',{
        method : "POST" ,
        headers : {
            "Content-Type" : "application/json"
        } ,
        body : JSON.stringify(entryDetails)
    })
    return response
}

/**
 * Execute function when submit in manual entry form is clicked
 * @param {HTMLElement} form - the form element in UI
 * @param {string} edit - the string representing edit value
 * @param {string} entryId - the uid of the time entry
 * @param {HTMLElement} deleteElement - the delete button element
 */
export const submitLogicInManualEntry = function(form,edit,entryId,deleteElement){
    document.getElementById("submit-details").onclick = async function(){
        let entryDetails,startTime,stopTime,duration,isStartTimeLess = true,isEdit = false
        if(edit) if(edit == 'edit') isEdit = true
        const details = getDetails()
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
                let startTimeStamp = unitFunctions.formatTime(hours,minutes,seconds,meridiam)
                hours = document.getElementsByClassName('stop-time-stamp-hours')[i].value
                minutes = document.getElementsByClassName('stop-time-stamp-minutes')[i].value
                seconds = document.getElementsByClassName('stop-time-stamp-seconds')[i].value
                meridiam = document.getElementsByClassName('stop-time-stamp-meridiam')[i].value
                let stopTimeStamp = unitFunctions.formatTime(hours,minutes,seconds,meridiam)
                if(unitFunctions.validateGreaterTime(timeHandlers.separateHrsMinsSecsFromFormatedTime(startTimeStamp),timeHandlers.separateHrsMinsSecsFromFormatedTime(stopTimeStamp))){
                    isStartTimeLess = true
                }
                else{
                    alert("Make sure start time is less than end time in all time stamps")
                    isStartTimeLess = false
                    break
                }
            }
            if(isStartTimeLess){
                details["email"] = getEmailOfUser()
                details["date"] = fullDate[2]
                details["month"] = fullDate[1]
                details["year"] = fullDate[0]
                if(isEdit) details['id'] = entryId
                entryDetails = await addEntryDetailsInFile(details)
                duration = timeHandlers.calculateDurationFromStartEndTime(startTime,stopTime)
                await updateEntryHandlers.updateDetail("duration",entryDetails,duration)
                await addStartTimeForEntry(entryDetails,startTime)
                await addStopTimeForEntry(entryDetails,stopTime)
                const response = await clearTimeStampsInFile(entryDetails)
                if(response.ok){
                    for(let i=0;i<numberOfTimeStamps;i++){
                        let hours = document.getElementsByClassName('start-time-stamp-hours')[i].value
                        let minutes = document.getElementsByClassName('start-time-stamp-minutes')[i].value
                        let seconds = document.getElementsByClassName('start-time-stamp-seconds')[i].value
                        let meridiam = document.getElementsByClassName('start-time-stamp-meridiam')[i].value
                        let startTimeStamp = unitFunctions.formatTime(hours,minutes,seconds,meridiam)
                        hours = document.getElementsByClassName('stop-time-stamp-hours')[i].value
                        minutes = document.getElementsByClassName('stop-time-stamp-minutes')[i].value
                        seconds = document.getElementsByClassName('stop-time-stamp-seconds')[i].value
                        meridiam = document.getElementsByClassName('stop-time-stamp-meridiam')[i].value
                        let stopTimeStamp = unitFunctions.formatTime(hours,minutes,seconds,meridiam)
                        await addTimeStamp(entryDetails,"start",startTimeStamp)
                        await addTimeStamp(entryDetails,"end",stopTimeStamp)
                    }
                }
                if(isEdit) document.getElementsByClassName('delete-button')[0].onclick.call(deleteElement,'edit')
                if(timeHandlers.checkIfToAddCurrentEntryInUi(details['date']) || timeHandlers.checkIfToAddCurrentEntryInUi(details['month'])) {
                    uiManipulators.addEntryInUi.call(entryDetails.id,details.taskName || '--',details.taskDescription || '--',details.category || '--',duration || "--:--:--",startTime || "--:--:--",stopTime || "--:--:--",unitFunctions.formatDate(details["date"],details["month"],details["year"]))
                }
                uiManipulators.addTaskDescriptionPopUpOnClick()
                uiManipulators.cancelPopup(form)
            }
        }
        else{
            alert('Please ensure start time is less than or equal to end time')
        }
    }
}