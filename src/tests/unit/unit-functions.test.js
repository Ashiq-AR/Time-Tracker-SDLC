import * as unitFunctions from '../../js-files/unit-functions.js'

test('Test the function returns true if passwords matches else false',()=>{
    expect(unitFunctions.confirmPassword('ashiq','ashiq')).toBeTruthy()
    expect(unitFunctions.confirmPassword('ashiq','aravind')).toBeFalsy()
    expect(unitFunctions.confirmPassword('Ashiq','ashiq')).toBeFalsy()
    expect(unitFunctions.confirmPassword('ASHIQ','ashiq')).toBeFalsy()
}) 

test('Test the function returns the correct hours value for given seconds',()=>{
    expect(unitFunctions.secondsToHours(3600)).toBe(1)
    expect(unitFunctions.secondsToHours(6000)).toBe(1)
    expect(unitFunctions.secondsToHours(72000)).toBe(20)
    expect(unitFunctions.secondsToHours(360000)).toBe(100)
    expect(unitFunctions.secondsToHours(2837492)).toBe(788)
})

test('Test the function returns the correct minutes value for given seconds',()=>{
    expect(unitFunctions.secondsToMinutes(60)).toBe(1)
    expect(unitFunctions.secondsToMinutes(3600023)).toBe(60000)
    expect(unitFunctions.secondsToMinutes(3287294)).toBe(54788)
    expect(unitFunctions.secondsToMinutes(-2324)).toBe(-39)
    expect(unitFunctions.secondsToMinutes("sdfs")).toBe(NaN)
})

test('Test the function padds a zero in front if a single digit number is given',()=>{
    expect(unitFunctions.paddZeroIfSingleDigit(1)).toBe("01")
    expect(unitFunctions.paddZeroIfSingleDigit(4)).toBe("04")
    expect(unitFunctions.paddZeroIfSingleDigit(9)).toBe("09")
    expect(unitFunctions.paddZeroIfSingleDigit(10)).toBe(10)
    expect(unitFunctions.paddZeroIfSingleDigit(1000)).toBe(1000)
})

test('Test the function correctly converts military time values to meridian time',()=>{
    expect(unitFunctions.militaryTimeToMeridiamTime(23,34,56)).toBe("11:34:56 PM")
    expect(unitFunctions.militaryTimeToMeridiamTime(0,54,43)).toBe("12:54:43 AM")
    expect(unitFunctions.militaryTimeToMeridiamTime(11,23,43)).toBe("11:23:43 AM")
    expect(unitFunctions.militaryTimeToMeridiamTime(13,54,7)).toBe("01:54:07 PM")
    expect(unitFunctions.militaryTimeToMeridiamTime(12,1,7)).toBe("12:01:07 PM")
    expect(unitFunctions.militaryTimeToMeridiamTime(231,2131,7213)).toBe("219:2131:7213 PM")
})

test('Test the function returns the formated date for given date parameters',()=>{
    expect(unitFunctions.formatDate(2,4,2023)).toBe('02/04/2023')
    expect(unitFunctions.formatDate(2324,2344,2023)).toBe('2324/2344/2023')
    expect(unitFunctions.formatDate(2324,7628)).toBe('2324/7628/undefined')
    expect(unitFunctions.formatDate(32,14,1000)).toBe('32/14/1000')
})

test('Test the function correctly returns the last element of the given iterator',()=>{
    expect(unitFunctions.getLastElementOfAnIterator([1,2,3])).toBe(3)
    expect(unitFunctions.getLastElementOfAnIterator([1,2,3,4,"asdf"])).toBe("asdf")
    expect(unitFunctions.getLastElementOfAnIterator('ashiq')).toBe("q")
    expect(unitFunctions.getLastElementOfAnIterator(new Set([
        ["apples", 500],
        ["bananas", 300],
        ["oranges", 200]
      ]))).toEqual([ 'oranges', 200 ])
    expect(unitFunctions.getLastElementOfAnIterator(new Map([
        ["apples", 500],
      ]))).toEqual([ 'apples', 500 ])
})

test('Test the function capitalizes the given string',()=>{
    expect(unitFunctions.capitalize('ashiq')).toBe("Ashiq")
    expect(unitFunctions.capitalize('ashiq rahman')).toBe("Ashiq rahman")
    expect(unitFunctions.capitalize("123")).toBe("123")
})