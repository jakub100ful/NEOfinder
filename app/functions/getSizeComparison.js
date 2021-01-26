/**
 * Returns a size comparison of a number
 * @param {number} measurement - NEO id to be queried
 * @param {string} measurementUnit - Can be any SI unit
 * @return {string} - Text describing comparison
 */
const getSizeComparison = async (measurement, measurementUnit) => {
    let error = "";
    const comparison = await fetch(`http://api.wolframalpha.com/v2/query?input=${measurement}%20${measurementUnit}&appid=U9HVAP-JTVETRJ636&output=json&includepodid=ComparisonAsLength&format=plaintext`)
    .then((response) => response.json())
    .then((responseJson) => {
    // Unloading payload depending on a successful call.

        if (responseJson){
            return responseJson.queryresult.pods[0].subpods[0].plaintext;
        }else{
            error = "Unable to fetch facts at this moment. Please try later or restart the app.";
        }
    // Error Handling
    }).catch((er) => {
        error = er;
    })

    if(error){
        console.log(error);
    }

    return comparison;
}

export default getSizeComparison;