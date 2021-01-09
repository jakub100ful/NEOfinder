/**
     * Takes an id of a Near Earth Object and returns a boolean based on whether it is in favourites
     * @param {string} NEOid - Identifier for the NEO to be looked up in favourites
     * @param {object} context - Context containing the global state hook for the favourite list
     * @return {boolean} Boolean result
     */
    const NEOisInFavourites = (NEOid, context) => {
        let isInFavourites = false;
        const tempList = context.NEOFavouritesList == null ? [] : context.NEOFavouritesList;

        if (tempList != undefined || tempList.length != 0) {
            for (let favourite of tempList){
                if (favourite === NEOid){
                    isInFavourites = true;
                    break;
                }
            }
        }
        return isInFavourites;
    }

export default NEOisInFavourites;