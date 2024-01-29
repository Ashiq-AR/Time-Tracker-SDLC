import * as unitFunctions from './unit-functions.js'
import * as domUtils from '../utils/dom-utils.js'

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
 * Sets the form input field with the given time
 * @param {string} name - the needed time
 * @param {string} formatedTime - the stored readable formated time
 */
export const setTimeInManualEntryForm = function(name,formatedTime){
    const time = separateHrsMinsSecsFromFormatedTime(formatedTime)
    document.getElementById(name+"-hours").value = time.hrs
    document.getElementById(name+"-minutes").value = time.mins
    document.getElementById(name+"-seconds").value = time.secs
    document.getElementById(name+"-meridiam").value = time.meridiam
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

/**
 * Returns the current date,month and week number based on given input
 * @param {string} name - date,month or week
 * @returns date,month or week number
 */
export const getCurrent = function(name){
    const date = new Date()
    if(name == 'date'){
        return date.getFullYear()+'-'+unitFunctions.paddZeroIfSingleDigit(parseInt(date.getMonth())+1)+'-'+date.getDate()
    }
    else if(name == 'month'){
        return date.getFullYear()+'-'+unitFunctions.paddZeroIfSingleDigit(parseInt(date.getMonth())+1)
    }
    else{
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000))+1
        let weekNumber = Math.ceil(days / 7);
        return date.getFullYear()+'-W'+unitFunctions.paddZeroIfSingleDigit(weekNumber)
    }
}

/**
 * Returns the date,month and year for critical start and end dates of a month
 * @param {string} date - date
 * @param {string} month - month
 * @param {string} year - year
 * @param {string} prevOrNext - indicated previous or next date,month or week
 * @returns the determined previous or next date
 * Note : Only works for dates - 1,28,29,30,31 and other inputs will give unexpected result in program
 */
export const determineDate = function(date,month,year,prevOrNext){
    const thirtyOneDays = ['01','03','05','07','08','10','12']
    const feb = '02'
    if(prevOrNext == 'prev'){
        let prevDate
        const prevMonthAndRespYear = getMonthAndRespYear(month,year,'prev')
        if(thirtyOneDays.includes(prevMonthAndRespYear[0])){
            prevDate = 31
        }
        else if(prevMonthAndRespYear[0] == feb){
            if(isLeapYear(prevMonthAndRespYear[1])){
                prevDate = 29
            }
            else prevDate = 28
        }
        else prevDate = 30
        return [prevDate,prevMonthAndRespYear[0],prevMonthAndRespYear[1]]
    }
    else{
        let nextDate,monthAndYear
        if(date == 28){
            if(isLeapYear(year)){
                nextDate = 29
            }
            else{
                nextDate = 1
                monthAndYear = getMonthAndRespYear(month,year,'next')
                month = monthAndYear[0]
                year = monthAndYear[1]
            }
        }
        else if(date == 30){
            if(thirtyOneDays.includes(unitFunctions.paddZeroIfSingleDigit(month))){
                nextDate = 31
            }
            else{
                nextDate=1
                monthAndYear = getMonthAndRespYear(month,year,'next')
                month = monthAndYear[0]
                year = monthAndYear[1]
            }
        }
        else{
            nextDate=1
            monthAndYear = getMonthAndRespYear(month,year,'next')
            month = monthAndYear[0]
            year = monthAndYear[1]
        }
        return [nextDate,month,year]
    }
}

/**
 * Returns the previous or next month and corresponding year based on given month and year
 * @param {string} month - month
 * @param {string} year - year
 * @param {string} prevOrNext - indicating previous or next month and year
 * @returns - the respective next or previous month and year
 */
export const getMonthAndRespYear = function(month,year,prevOrNext){
    let prevMonth,nextMonth
    if(prevOrNext == 'prev'){
        if(month == 1) {
            prevMonth = 12
            year = year-1
        }
        else prevMonth = month - 1
        return [prevMonth,year]
    }
    else{
        if(month == 12){
            nextMonth = 1
            year+=1
        }
        else nextMonth = month + 1
        return [nextMonth,year]
    }
}

/**
 * Returns true if the given year is leap year else false
 * @param {string} year - year
 * @returns true || false
 */
export const isLeapYear = function(year){
    if(year%4 == 0) return true
    else return false
}

/**
 * Returns true current date or month is shown in UI then returns true else false 
 * @param {string} value - date or month
 * @returns true || false
 */
export const checkIfToAddCurrentEntryInUi = function(value){
    const filterBy = domUtils.filterByCalendar.value
    if(filterBy == 'date'){
        if(domUtils.filterDate.value.split('-')[2] == value) return true
        else return false
    }
    else if(filterBy == 'month'){
        if(domUtils.filterMonth.value.split('-')[1] == value) return true
        else return false
    }
}