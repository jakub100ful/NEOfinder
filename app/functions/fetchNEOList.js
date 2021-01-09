import NEOisInFavourites from './NEOisInFavourites';

const apiKey = "R3aOcYecyMfmnmoOL17jBY0ohDkk5o3e73j4O8BX";

/**
 * Fetches the NEO list for given date
 * @param {date} date - Date to be queried
 * @param {object} context - Context containing the global state hook for the favourite list
 * @param {function callback(returnedList) { return returnedList }} - A callback to return the list
 */
const fetchNEOList = async (date, context) => {
    let error = "";

    const fetchedList = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((responseJson) => {
    // Unloading payload depending on a successful call.
        if (responseJson.near_earth_objects){
            const responseNEO = responseJson.near_earth_objects;
            const tempNEOList = [];

            for (let key in responseNEO){
                if (date == key){
                    responseNEO[key].forEach((NEO)=>{
                        NEO.isInFavourites = NEOisInFavourites(NEO.id, context);
                        tempNEOList.push(NEO);
                    })
                }
                
            }
            
            return tempNEOList;
        }else{
            if (responseJson.error.message){
                error = responseJson.error.message;
            }
        }
    // Error Handling
    }).catch((er) => {
        error = er;
    })

    if(error){
        console.log(error);
    }

    return fetchedList;
}

export default fetchNEOList;