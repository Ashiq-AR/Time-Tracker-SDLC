/**
 * Gives the email of the user from the url query
 * @returns email id of the user
 */
export const getEmailOfUser = function(){
    let email = window.location.search.slice(7)
    return email
}
