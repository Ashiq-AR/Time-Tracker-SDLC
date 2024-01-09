/**
 * To verify to string are equal or not
 * @param {string} password - the password
 * @param {string} confirmPassword - the re entered password
 * @returns true if both the passwords match or not
 */
export const confirmPassword = function (password,confirmPassword){
    if(password === confirmPassword){
        return true
    }
    else{
        return false
    }
}