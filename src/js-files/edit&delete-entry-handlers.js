import { submitLogicInManualEntry } from './add-entry-handlers.js'
import { separateHrsMinsSecsFromFormatedTime, setTimeInManualEntryForm } from './time-handlers.js'
import { deleteElementInUi, displayManualEntryForm, displayTimeEntriesNotFound, timeStampLogicInManualEntry } from './ui-manipulators.js'
import * as unitFunctions from './unit-functions.js'
import { getEmailOfUser } from './user-handlers.js'

/**
 * Adds the listener for edit and delete button for an entry
 * @param {string} formatedDate - the formated readable date
 * @param {string} editOrDelete - a value denoting edit or delete
 */
export const addListener = function(formatedDate,editOrDelete){
    unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName(`${editOrDelete}-button`)).onclick = async function(){
        const message = (arguments[0] == 'edit')?  true: confirm(`Are you sure to ${editOrDelete} entry`)
        if(message){
            const email = getEmailOfUser()
            const date = formatedDate.split('/')[0]
            const month = formatedDate.split('/')[1]
            const year = formatedDate.split('/')[2]
            const timeEntry = this.parentElement.parentElement
            const entryId = timeEntry.id
            const response = await fetch(`/${editOrDelete}-entry`,{
                method : 'POST' ,
                headers : {
                    'Content-Type' : "application/json"
                } ,
                body : JSON.stringify({
                    email : email ,
                    date : date,
                    month : month,
                    year : year,
                    entryId: entryId 
                })
            })
            if(response.ok){
                if(editOrDelete == 'delete'){
                    const noOfTimeEntriesInUi = timeEntry.parentElement.childElementCount
                    deleteElementInUi(timeEntry)
                    if(!(noOfTimeEntriesInUi-1)) displayTimeEntriesNotFound()
                    if(!arguments[0]=='edit') alert('Deleted Successfully')
                }
                else{
                    const entryDetails = await response.json()
                    entryDetails.entryId = entryId
                    entryDetails.date = year+'-'+month+'-'+date
                    const form = displayManualEntryForm()
                    showEntryDetailsInForm(entryDetails)
                    submitLogicInManualEntry(form,'edit',entryId,timeEntry.lastChild.firstElementChild)
                }
            }
        }
    }
}

/**
 * Shows the details in the manual entry input fields
 * @param {object} entryDetails - the details of a time entry
 */
const showEntryDetailsInForm = function(entryDetails){
    document.getElementById('task-name-input').value = entryDetails.taskName
    document.getElementById('task-description-input').value = entryDetails.taskDescription
    document.getElementById('category-input').value = entryDetails.category
    document.getElementById('date').value = entryDetails.date
    setTimeInManualEntryForm('start-time',entryDetails.startTime)
    setTimeInManualEntryForm('stop-time',entryDetails.stopTime)
    if(Object.hasOwn(entryDetails,'timeSlots')){
        const timeSlots = entryDetails.timeSlots
        timeStampLogicInManualEntry()
        for(let i=0;i<timeSlots.length;i++){
            if(i!=0) document.getElementById('add-time-stamp').onclick()
            const startTime = separateHrsMinsSecsFromFormatedTime(timeSlots[i].startTime)
            const stopTime = separateHrsMinsSecsFromFormatedTime(timeSlots[i].endTime)
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('start-time-stamp-hours')).value = startTime.hrs
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('start-time-stamp-minutes')).value = startTime.mins
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('start-time-stamp-seconds')).value = startTime.secs
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('start-time-stamp-meridiam')).value = startTime.meridiam
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('stop-time-stamp-hours')).value = stopTime.hrs
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('stop-time-stamp-minutes')).value = stopTime.mins
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('stop-time-stamp-seconds')).value = stopTime.secs
            unitFunctions.getLastElementOfAnIterator(document.getElementsByClassName('stop-time-stamp-meridiam')).value = stopTime.meridiam
        }
    }
}

/**
 * Clears the time stamp slots in the file
 * @param {object} entryDetails - details of a time entry
 * @returns response aboout the operation
 */
export const clearTimeStampsInFile = async function(entryDetails){
    const response = await fetch(`/clear-time-stamps`,{
        method : 'POST' ,
        headers : {
            'Content-Type' : "application/json"
        } ,
        body : JSON.stringify({
            email : getEmailOfUser() ,
            date : entryDetails.date,
            month : entryDetails.month,
            year : entryDetails.year,
            entryId: entryDetails.id 
        })
    })
    return response
}