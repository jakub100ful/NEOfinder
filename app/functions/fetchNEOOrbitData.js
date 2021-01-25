/**
 * Returns NEO orbit data object for a NEO id 
 * @param {string} NEOid - NEO id to be queried
 * @return {object} - Object containing NEO orbit data
 */
const fetchNEOOrbitData = async (NEOid) => {
    let error = "";
    const orbitData = await fetch(`https://www.neowsapp.com/rest/v1/neo/${NEOid}?api_key=R3aOcYecyMfmnmoOL17jBY0ohDkk5o3e73j4O8BX`)
    .then((response) => response.json())
    .then((responseJson) => {
    // Unloading payload depending on a successful call.

        if (responseJson){
            return responseJson;
        }else{
            error = "Unable to fetch orbit data at this moment. Please try later or restart the app.";
        }
    // Error Handling
    }).catch((er) => {
        error = er;
    })

    if(error){
        console.log(error);
    }

    return orbitData;
}

export default fetchNEOOrbitData;