/**
 * Takes a Near Earth Object item and adds or removes it from the favourites list.
 * @param {object} NEO - Identifier for the NEO to be added/removed
 * @param {object} favouriteList - The state containing the favourites list to be handled
 * @param {object} listSetter - The state setter for updating the favourites list and triggering the useEffect for storing the list
 */
const handleNEOInFavouriteState = (NEO, favouriteList, listSetter) =>{
    try {
        console.log(favouriteList);
        const parsedList = favouriteList == null ? [] : favouriteList;
        const tempList = parsedList;
        let matchFound = false;

        // List is already empty, no need to check for existing keys
        if (parsedList === undefined || parsedList.length == 0) {
            tempList.push(NEO.id);
            // saveFavouritesToStore(tempList);
            NEO.isInFavourites = true;
            listSetter(tempList);

        // List is populated, and therefore needs to be iterated through to avoid duplicate keys
        }else{
            console.log(typeof parsedList);
            for (let i = 0; i < parsedList.length; i++){
                // If a match is found, it removes the existing key
                if (parsedList[i] === NEO.id){
                    matchFound = true;
                    NEO.isInFavourites = false;
                    tempList.splice(i, 1);
                    // saveFavouritesToStore(tempList);
                    listSetter(tempList);
                    break;
                }
            }

            // If no match is found, it is safe to add the key to the array
            if (!matchFound){
                tempList.push(NEO.id);
                NEO.isInFavourites = true;
                // saveFavouritesToStore(tempList);
                listSetter(tempList);
            }
        }
        console.log(favouriteList);

    } catch (e) {
        console.log(e);
    }
};

export default handleNEOInFavouriteState;