import * as unitFunctions from './unit-functions.js'

/**
 * Returns the computed duration from seconds to "hrs:mins:secs" format
 * @param {number} duration - total duration of a particular task in seconds
 * @returns The duration in "hrs:mins:secs" format
 */
export const formatDuration = function(duration){
    let hrs = 0
    let mins = 0
    let secs = 0
    let formatedDuration
    hrs = unitFunctions.secondsToHours(duration)
    mins = unitFunctions.secondsToMinutes(duration)
    secs = duration - (hrs*3600 + mins*60)
    hrs = unitFunctions.paddZeroIfSingleDigit(hrs)
    mins = unitFunctions.paddZeroIfSingleDigit(mins)
    secs = unitFunctions.paddZeroIfSingleDigit(secs)
    formatedDuration = hrs+':'+mins+':'+secs
    return formatedDuration
}
