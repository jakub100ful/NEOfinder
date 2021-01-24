/**
 * Returns NEO orbit data object for a NEO id 
 * @param {string} NEOid - NEO id to be queried
 * @return {object} - Object containing NEO orbit data
 */
const fetchNEOOrbitData = async (NEOid) => {
    let error = "";
    const orbitData = await fetch(`https://ssd-api.jpl.nasa.gov/sbdb.api?spk=${NEOid}&cd-epoch=1`)
    .then((response) => response.json())
    .then((responseJson) => {
    // Unloading payload depending on a successful call.

        if (responseJson.orbit){
            const orbitDataResponse = responseJson.orbit;
            return orbitDataResponse;
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