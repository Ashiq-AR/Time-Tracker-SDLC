import * as domUtils from '../utils/dom-utils.js'

/**
 * Displays a popup with parameter as content
 * @param {HTMLTemplateElement} innerHtml - the template to be display on popup
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
}

/**
 * To add or remove a specific class to collection of DOM elements
 * @param {object} iterator - collection of DOM elements
 * @param {string} className - name of a class
 * @param {string} addOrRemove - to add or remove the specific class on elements
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
 * To cancel a displayed popup
 * @param {HTMLTemplateElement} aside - the template element displayed on popup
 */
const cancelPopup = function (aside){
    domUtils.header.classList.remove('blur')
    addOrRemoveClassListOnIterator(domUtils.allSection,'blur','remove')
    aside.remove()
}