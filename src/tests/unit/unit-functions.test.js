import * as unitFunctions from '../../js-files/unit-functions.js'

test('Test the function returns true if passwords matches else false',()=>{
    expect(unitFunctions.confirmPassword('ashiq','ashiq')).toBeTruthy()
    expect(unitFunctions.confirmPassword('ashiq','aravind')).toBeFalsy()
    expect(unitFunctions.confirmPassword('Ashiq','ashiq')).toBeFalsy()
    expect(unitFunctions.confirmPassword('ASHIQ','ashiq')).toBeFalsy()
})