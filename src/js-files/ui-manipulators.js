import * as domUtils from '../utils/dom-utils.js'
import * as timerHandlers from './timer-handlers.js'
import * as unitFunctions from './unit-functions.js'

/**
 * Show the popup for given html template
 * @param {string} innerHtml - html template to show on popup
 * @returns The created division of that innerHtml parameter
 */
export const showPopup = function(innerHtml){
    let aside = document.createElement('aside')
    let cancelIcon = document.createElement('div')
    let content = document.createElement('div')
    content.classList.add('popup-content')
    content.innerHTML = innerHtml
    cancelIcon.innerHTML = `
    <div class="popup-cancel">
        <img src="../assets/images/cancel.png" alt="cancel" id="cancel-popup" width="20px" ></img>
    </div>`
    /**
     * Listener to cancel the display popup
     */
    cancelIcon.onclick = function(){
        cancelPopup(aside)
    }
    aside.appendChild(cancelIcon)
    aside.appendChild(content)
    domUtils.header.classList.add('blur')
    addOrRemoveClassListOnIterator(domUtils.allSection,'blur','add')
    aside.classList.add('popup')
    domUtils.html.appendChild(aside)
    return aside
}

/**
 * Gets an iterator and adds a class to every elements of the class
 * @param {Iterable} iterator - Javascript iterator
 * @param {string} className - the name of class to add for every iterator
 * @param {string} addOrRemove - to add or remove in classList
 */
export const addOrRemoveClassListOnIterator = function (iterator , className , addOrRemove){
    for(const element of iterator){
        if(addOrRemove == 'add'){
            element.classList.add(className)
        }
        else{
            element.classList.remove(className)
        }
    }
}

/**
 * Removes the shown popup
 * @param {string} aside - the created element for popup
 */
export const cancelPopup = function (aside){
    domUtils.header.classList.remove('blur')
    addOrRemoveClassListOnIterator(domUtils.allSection,'blur','remove')
    aside.remove()
}

/**
 * Adds listeners to display a popup of task description when it is clicked
 */
export const addTaskDescriptionPopUpOnClick = function(){
    for(const taskdes of document.getElementsByClassName('task-description')){
        taskdes.onclick = (event)=>{
            showPopup(event.target.innerHTML)
        }
    }
}

/**
 * Displays the popup with task input fields
 * @returns The created division of a popup
 */
export const displayDetailsForm = function(){
    let section = `
    <section class="form-layout">
        <label for="task-name-input">Task Name : </label>
        <input type="text" name="task-name" id="task-name-input">
        <label for="task-description-input">Task Description : </label>
        <textarea name="task-description-input" id="task-description-input" cols="20" rows="10" minlength="50"></textarea>
        <label for="category-input">Category : </label>
        <select name="category" id="category-input">
            <option value="work">Work</option>
            <option value="entertainment">Entertainment</option>
            <option value="sleep">Sleep</option>
            <option value="read">Read</option>
            <option value="transport">Transport</option>
        </select>
    <div id="submit-details" class="button">ADD</div>
    </section>`
    return showPopup(section)
}

/**
 * Creates a entry in User Interface
 * @param {string} taskName - the name of a task
 * @param {string} taskDescription - the elaborated description of a particular task
 * @param {string} category - the category type of a task
 * @param {string} duration - the entire duration of the task
 * @param {string} start - the start time
 * @param {string} end - the stop time
 * @param {string} date - the date of task entry
 */
export const addEntryInUi = function (taskName,taskDescription,category,duration,start,end,date){
    let entry = document.createElement('div')
    entry.innerHTML = `
    <div class="time-entry block-style">
            <h3 class="task-name">${unitFunctions.capitalize(taskName)}</h3>
            <h3 class="category-title">Category</h3>
            <h3 class="total-duration-title">Duration</h3>
            <div class="task-description hide-scrollbar">${unitFunctions.capitalize(taskDescription)}</div>
            <div class="category">${unitFunctions.capitalize(category)}</div>
            <div class="total-duration flex-center">${duration}</div>
            <div class="start-and-end flex-center">
                <div>
                    <div class="start-title">Start</div>
                    <div class="start">${start}</div>
                </div>
                <div>
                    <div class="end-title">End</div>
                    <div class="end">${end}</div>   
                </div>
            </div>
            <div class="flex-center">
                <div>
                    <div>Date</div>
                    <div class="date">${date}</div>
                </div>
            </div>
            <div class="edit-buttons flex-center">
                <img src="../assets/images/delete-button.svg" alt="delete-button" id="delete-button" width="20px">
                <img src="../assets/images/edit.png" alt="edit" id="edit-button" width="20px">
            </div>
        </div>`
        domUtils.timeEntryContainer.append(entry)
}

/**
 * Display respective icon for timer state
 * @param {string} timerStatus - Status of the timer
 */
export const showIconOnTimerStatus = function(timerStatus){
    if(timerStatus == 'running'){
        domUtils.startTimer.classList.add('hide')
        domUtils.pauseTimer.classList.remove('hide')
    }
    else if(timerStatus == 'paused' || timerStatus == 'stopped'){
        domUtils.pauseTimer.classList.add('hide')
        domUtils.startTimer.classList.remove('hide')
    }
    else if(timerStatus == 'stopped'){
        domUtils.pauseTimer.classList.add('hide')
        domUtils.startTimer.classList.remove('hide')
        domUtils.timer.innerText = '00:00:00'
    }
}

/**
 * Displays the time in the timer field of User Interface
 * @param {string} duration - the duration of a task in seconds
 */
export const showRunningTimer = function(duration){
    duration = timerHandlers.formatDuration(duration)
    domUtils.timer.innerHTML = duration
}

/**
 * Displays a time entry form popup to create a manual entry
 */
export const displayManualEntryForm = function(){
    let section = `
    <form class="form-layout">
        <label for="task-name-input">Task Name : </label>
        <input type="text" name="task-name" id="task-name-input">
        <label for="task-description-input">Task Description : </label>
        <textarea name="task-description-input" id="task-description-input" cols="20" rows="10" minlength="50"></textarea>
        <label for="category-input">Category : </label>
        <select name="category" id="category-input">
            <option value="work">Work</option>
            <option value="entertainment">Entertainment</option>
            <option value="sleep">Sleep</option>
            <option value="read">Read</option>
            <option value="transport">Transport</option>
        </select>
        <label for="date">Date :</label>
        <input type="date" name="date" id="date">
        <div class="times-container">
            <div class="time-entry-container">
                <label for="start-time-block">Start: </label>
                <div id="start-time-block" class="flex-center">
                    <input type="number" name="start-time-hours" id="start-time-hours" min="1" max="12">
                    <span>:</span>
                    <input type="number" name="start-time-minutes" id="start-time-minutes" min="0" max="59">
                    <span>:</span>
                    <input type="number" name="start-time-seconds" id="start-time-seconds" min="0" max="59">
                    <span>:</span>
                    <select name="start-time-meridiam" id="start-time-meridiam">
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
                <label for="stop-time-block">End: </label>
                <div id="stop-time-block" class="flex-center">
                    <input type="number" name="stop-time-hours" id="stop-time-hours" min="1" max="12">
                    <span>:</span>
                    <input type="number" name="stop-time-minutes" id="stop-time-minutes" min="0" max="59">
                    <span>:</span>
                    <input type="number" name="stop-time-seconds" id="stop-time-seconds" min="0" max="59">
                    <span>:</span>
                    <select name="stop-time-meridiam" id="stop-time-meridiam">
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="time-stamps-container">Time Stamps :</label>
                <div class="time-stamps-container" id="time-stamps-container">
                    <div class="flex-center time-entry-container">
                        <label for="from">From:</label>
                        <div id="start-time-stamp-block" class="flex-center">
                            <input type="number" name="start-time-stamp-hours" class="start-time-stamp-hours" min="1" max="12">
                            <span>:</span>
                            <input type="number" name="start-time-stamp-minutes" class="start-time-stamp-minutes" min="0" max="59">
                            <span>:</span>
                            <input type="number" name="start-time-stamp-seconds" class="start-time-stamp-seconds" min="0" max="59">
                            <span>:</span>
                            <select name="start-time-stamp-meridiam" class="start-time-stamp-meridiam">
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                        <label for="to">To:</label>
                        <div id="stop-time-stamp-block" class="flex-center">
                            <input type="number" name="stop-time-stamp-hours" class="stop-time-stamp-hours" min="1" max="12">
                            <span>:</span>
                            <input type="number" name="stop-time-stamp-minutes" class="stop-time-stamp-minutes" min="0" max="59">
                            <span>:</span>
                            <input type="number" name="stop-time-stamp-seconds" class="stop-time-stamp-seconds" min="0" max="59">
                            <span>:</span>
                            <select name="stop-time-stamp-meridiam" class="stop-time-stamp-meridiam">
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                        <img src="/assets/images/delete-button.svg" class="delete-time-stamp" alt="delete" width="20px">
                    </div>
                </div>
                <div class="add-button-container">
                    <img src="../assets/images/add.png" id="add-time-stamp" alt="add">
                </div>
            </div>
        </div>
        <div id="submit-details" class="button">ADD</div>
    </form>`
    return showPopup(section)
}

/**
 * Add a time stamp in Manual entry form in UI
 */
export const addTimeStampInUiForm = function(){
    const timeStamp = document.createElement('div')
    timeStamp.classList.add("flex-center","time-entry-container")
    const timeStampTemplate = `
    <label for="from">From:</label>
    <div id="start-time-stamp-block" class="flex-center">
        <input type="number" name="start-time-stamp-hours" class="start-time-stamp-hours" min="1" max="12">
        <span>:</span>
        <input type="number" name="start-time-stamp-minutes" class="start-time-stamp-minutes" min="0" max="59">
        <span>:</span>
        <input type="number" name="start-time-stamp-seconds" class="start-time-stamp-seconds" min="0" max="59">
        <span>:</span>
        <select name="start-time-stamp-meridiam" class="start-time-stamp-meridiam">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
    </div>
    <label for="to">To:</label>
    <div id="stop-time-stamp-block" class="flex-center">
        <input type="number" name="stop-time-stamp-hours" class="stop-time-stamp-hours" min="1" max="12">
        <span>:</span>
        <input type="number" name="stop-time-stamp-minutes" class="stop-time-stamp-minutes" min="0" max="59">
        <span>:</span>
        <input type="number" name="stop-time-stamp-seconds" class="stop-time-stamp-seconds" min="0" max="59">
        <span>:</span>
        <select name="stop-time-stamp-meridiam" class="stop-time-stamp-meridiam">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
    </div>
    <img src="/assets/images/delete-button.svg" class="delete-time-stamp" alt="delete" width="20px">`
    timeStamp.innerHTML = timeStampTemplate
    document.getElementById("time-stamps-container").append(timeStamp)
}

/**
 * Delete an element in DOM
 * @param {HTMLElement} element - element to delete
 */
export const deleteElementInUi = function(element){
    element.remove()
}