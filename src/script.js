import * as domUtils from './utils/dom-utils.js'
import * as uiManipulators from './js-files/ui-manipulators.js'

let details = {}

/**
 * Show the task descriptions of filtered entries on click
 * @param {object} event - The event on the DOM element on click
 */
domUtils.taskDescriptions[0].onclick = (event)=>{
    uiManipulators.showPopup(event.target.innerHTML)
}

/**
 * Show details to add time entry details
 */
domUtils.addDetails.onclick = function (){
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
    <div id="submit-details" class="button">ADD</div>
    </form>`
    uiManipulators.showPopup(section)
    document.getElementById('submit-details').onclick = function(){
        details = addEntryHandlers.getDetails()
    }
}

/**
 * Show details to add manual entry
 */
domUtils.addManualEntry.onclick = function(){
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
                <label for="duration">Duration: </label>
                <div id="duration-block" class="flex-center">
                    <input type="number" name="duration-hours" id="duration-hours" min="0" max="23">
                    <span>:</span>
                    <input type="number" name="duration-minutes" id="duration-minutes" min="0" max="59">
                    <span>:</span>
                    <input type="number" name="duration-seconds" id="duration-seconds" min="0" max="59">
                </div>
                <label for="start-time-block">Start: </label>
                <div id="start-time-block" class="flex-center">
                    <input type="number" name="start-time-hours" id="start-time-hours" min="0" max="23">
                    <span>:</span>
                    <input type="number" name="start-time-minutes" id="start-time-minutes" min="0" max="59">
                    <span>:</span>
                    <input type="number" name="start-time-seconds" id="start-time-seconds" min="0" max="59">
                </div>
                <label for="stop-time-block">End: </label>
                <div id="stop-time-block" class="flex-center">
                    <input type="number" name="stop-time-hours" id="stop-time-hours" min="0" max="23">
                    <span>:</span>
                    <input type="number" name="stop-time-minutes" id="stop-time-minutes" min="0" max="59">
                    <span>:</span>
                    <input type="number" name="stop-time-seconds" id="stop-time-seconds" min="0" max="59">
                </div>
            </div>
            <div>
                <label for="time-stamps-container">Time Stamps :</label>
                <div class="time-stamps-container">
                    <div class="flex-center time-entry-container">
                        <label for="from">From:</label>
                        <div id="stop-time-block" class="flex-center">
                            <input type="number" name="stop-time-hours" id="stop-time-hours" min="0" max="23">
                            <span>:</span>
                            <input type="number" name="stop-time-minutes" id="stop-time-minutes" min="0" max="59">
                            <span>:</span>
                            <input type="number" name="stop-time-seconds" id="stop-time-seconds" min="0" max="59">
                        </div>
                        <label for="to">To:</label>
                        <div id="stop-time-block" class="flex-center">
                            <input type="number" name="stop-time-hours" id="stop-time-hours" min="0" max="23">
                            <span>:</span>
                            <input type="number" name="stop-time-minutes" id="stop-time-minutes" min="0" max="59">
                            <span>:</span>
                            <input type="number" name="stop-time-seconds" id="stop-time-seconds" min="0" max="59">
                        </div>
                    </div>
                </div>
                <div class="add-button-container">
                    <img src="../assets/images/add.png" alt="add">
                </div>
            </div>
        </div>
        <div id="submit-details" class="button">ADD</div>
    </form>`
    uiManipulators.showPopup(section)
}