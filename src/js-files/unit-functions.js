/**
 * Checks for matching of password and confirm password || Checks for matching of any two strings
 * @param {string} password - Entered password on signup || string 1
 * @param {string} confirmPassword - Entered confirm password on signup || string 2
 * @returns true if password and comfirmPassword matches else false || true if strings matched
 */
export const confirmPassword = function (password,confirmPassword){
    if( password == confirmPassword){
        return true
    }
    else{
        return false
    }
}

/**
 * Converts seconds to hours
 * @param {number} duration - duration in seconds
 * @returns hours of seconds
 */
export const secondsToHours = function(duration){
    return Math.floor(duration/3600)
}

/**
 * Converts seconds to minutes
 * @param {string} duration - duration in seconds
 * @returns minutes of seconds
 */
export const secondsToMinutes = function(duration){
    return Math.floor(duration/60)
}

/**
 * Padds zero in front if single digit is entered else returns the digit
 * @param {string} number - a number
 * @returns padded format for single digit
 */
export const paddZeroIfSingleDigit = function(number){
    return (number.toString().length < 2) ? '0'+number : number
}

/**
 * Converts hour from 24 hr format to 12 hr format
 * @param {number} hours - Hours in 24 hour format
 * @param {number} minutes - minutes
 * @param {number} seconds - seconds
 * @returns formated meridiam time
 */
export const militaryTimeToMeridiamTime = function (hours,minutes,seconds){
    let meridiam
    if(hours >= 12){
        if(hours == 12) hours = 12
        else hours = hours - 12
        meridiam = "PM"
    }
    else{
        if(hours == 0) hours = 12
        meridiam = "AM"
    }
    hours = paddZeroIfSingleDigit(hours)
    minutes = paddZeroIfSingleDigit(minutes)
    seconds = paddZeroIfSingleDigit(seconds)
    return hours+":"+minutes+":"+seconds+" "+meridiam
}

/**
 * Formats the date
 * @param {number} date - date
 * @param {number} month - month
 * @param {number} year - year
 * @returns date formated to display
 */
export const formatDate = function(date,month,year){
    return paddZeroIfSingleDigit(date)+'/'+paddZeroIfSingleDigit(month)+'/'+year
}

/**
 * Returns the last element of a given iterator
 * @param {iterator} iterator - iterator in javascript
 * @returns the last element of the given iterator
 */
export const getLastElementOfAnIterator = function(iterator){
    const length = iterator.length || iterator.size
    return Array.from(iterator)[length-1]
}

/**
 * Capitalizes the input string
 * @param {string} string - a string value or name
 * @returns the capitalized version of the string
 */
export const capitalize = function(string){
    return string.charAt(0).toUpperCase()+string.slice(1)
}

/**
 * Returns the time in user readable formate
 * @param {number} hours - hours
 * @param {number} minutes - minutes
 * @param {number} seconds - seconds
 * @param {string} meridiam - meridiam of the time
 * @returns the formated time
 */
export const formatTime = function(hours,minutes,seconds,meridiam){
    hours = paddZeroIfSingleDigit(hours)
    minutes = paddZeroIfSingleDigit(minutes)
    seconds = paddZeroIfSingleDigit(seconds)
    if(meridiam){
        return hours+":"+minutes+":"+seconds+" "+meridiam
    }
    else{
        return hours+":"+minutes+":"+seconds
    }
}

/**
 * Checks and returns true if given end time is greater than start time
 * @param {object} startTime - start time of an entry
 * @param {object} endTime - end time of an entry
 * @returns true if end time is greater than start time
 */
export const validateGreaterTime = function(startTime,endTime){
    if(startTime.meridiam == endTime.meridiam){
        const start = [startTime.hrs,startTime.mins,startTime.secs]
        const end = [endTime.hrs,endTime.mins,endTime.secs]
        for(let i=0;i<3;i++){
            if(start[i]<=end[i]){
                if(start[i]==end[i]){
                    continue
                }
                else return true
            }
            else return false
        }
        return false
    }
    else return true
}
