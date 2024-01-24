import * as domUtils from '../utils/dom-utils.js'
import * as unitFunctions from '../js-files/unit-functions.js'

/**
 * Show login form in webpage
 */
const showLoginandHideSignUp = function (){
    domUtils.loginDetails.classList.remove('hide')
    domUtils.loginDetails.classList.add('details')
    domUtils.signupDetails.classList.add('hide')
    domUtils.signupDetails.classList.remove('details')
}

/**
 * Show signup form in webpage
 */
const showSignUpandHideLogin = function (){
    domUtils.signupDetails.classList.remove('hide')
    domUtils.signupDetails.classList.add('details')
    domUtils.loginDetails.classList.add('hide')
    domUtils.loginDetails.classList.remove('details')
}

showLoginandHideSignUp()

domUtils.signupSelect.onclick = showSignUpandHideLogin
domUtils.loginSelect.onclick = showLoginandHideSignUp

domUtils.signupForm.onsubmit = function (){
    if(!unitFunctions.confirmPassword(domUtils.signupPassword.value,domUtils.confirmPassword.value)){
        alert("Password doesn't match , please try again")
        return false
    }
}