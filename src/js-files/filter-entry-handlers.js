import { getEmailOfUser } from "./user-handlers.js"
import * as domUtils from '../utils/dom-utils.js'

export let notFound = true
let filteredEntries

/**
 * Gets the entries filtered upon given parameters
 * @param {string} getBy - the date,month or week
 * @param {string} inputValue - the value based on getBy
 * @returns the filteredEntries 
 */
export const getEntries = async function(getBy,inputValue){
    const email = getEmailOfUser()
    const response = await fetch(`/get-by-${getBy}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            getBy: getBy,
            inputValue: inputValue,
            email: email
        })
    })
    filteredEntries = await response.json()
    return filteredEntries
}

/**
 * Filters the entries based on given category
 * @param {string} filterBy - the category
 * @returns the filteredEntries based on category
 */
export const filterByCategory = function(filterBy){
    if(filterBy == 'all'){
        if(Object.keys(filteredEntries).length == 0){
            notFound = false
            return 'not found'
        }
        return filteredEntries
    }
    const filter = domUtils.filterByCalendar.value
    if(filter == 'date'){
        for(const entryId in filteredEntries){
            if(!(filteredEntries[entryId].category == filterBy)){
                delete filteredEntries[entryId]
                if(notFound) notFound = true
            }
            else{
                notFound = false
            }
        }
    }
    else if(filter == 'month'){
        for(const date in filteredEntries){
            for(const entryId in filteredEntries[date]){
                if(!(filteredEntries[date][entryId].category == filterBy)){
                    delete filteredEntries[date][entryId]
                    if(notFound) notFound = true
                }
                else{
                    notFound = false
                }
            }
        }
    }
    return (notFound)? "not found":filteredEntries
}