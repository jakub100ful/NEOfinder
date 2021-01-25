/**
 * Returns a list of NEO data from a list of NEO IDs
 * @param {list} favouriteList - A list containing the favourited NEO IDs
 * @returns {list} - List containing the favourite NEO objects
 */
const fetchNEOFavourites = async (favouritesList) => {
    const apiKey = "R3aOcYecyMfmnmoOL17jBY0ohDkk5o3e73j4O8BX";
    let error = "";
    let fetchedNEO;

    const fetchedList = favouritesList.map(async (NEOid) => {
        fetchedNEO = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${NEOid}?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((responseJson) => {
            
        // Unloading payload depending on a successful call.
            if (responseJson){
                console.log("Response:",responseJson)
                return responseJson;
            }else{
                error = "Unable to fetch orbit data at this moment. Please try later or restart the app.";
            }

        // Error Handling
        }).catch((er) => {
            error = er
        })
        return fetchedNEO;
    })

    if(error){
        console.log(error);
    }

    return fetchedList;
}

export default fetchNEOFavourites;