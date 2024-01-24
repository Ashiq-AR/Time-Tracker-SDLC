/**
 * Updates an information in the file
 * @param {string} detailType - the information title needed to update
 * @param {object} entryDetails - the details of the entry to fetch
 * @param {string} detail - the information needed to update
 * @returns response regarding the details of update
 */
export const updateDetail = async function(detailType,entryDetails,detail){
    entryDetails[detailType] = detail
    entryDetails["detail"] = detailType
    let response = await fetch('/update-detail',{
        method : 'POST' ,
        headers : {
            "Content-Type" : "application/json"  ,
        } ,
        body : JSON.stringify(entryDetails)
    })
    return response
    
}