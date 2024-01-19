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