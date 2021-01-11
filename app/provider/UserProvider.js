import React, { useEffect } from 'react';
import { useState } from 'react';
import getFavouritesFromStore from '../functions/getFavouritesFromStore';
import saveFavouritesToStore from '../functions/saveFavouritesToStore';

const UserContext = React.createContext();

const UserProvider = (props) => {
    
    const [NEOFavouritesList, setNEOFavouritesList] = useState([]);

    // Loads the list from store into the state hook
    useEffect(() => {
        const fetchData = async () => {
            const result = await getFavouritesFromStore().then((list)=>{return list});
            setNEOFavouritesList(result);
        };
        fetchData();
      }, []);

    // Saves the current list to store if an update occurs 
    useEffect(() => {
        if (NEOFavouritesList != []){
            saveFavouritesToStore(NEOFavouritesList);
        }
      }, [NEOFavouritesList]);


    /**
     * Takes a Near Earth Object item and adds or removes it from the favourites list.
     * @param {object} NEO - Identifier for the NEO to be added/removed
     */
    const handleNEOFavouritesListChange = (NEO) =>{
        try {
            const parsedList = NEOFavouritesList == null ? [] : NEOFavouritesList;
            const tempList = parsedList;
            let matchFound = false;

            // List is already empty, no need to check for existing keys
            if (parsedList === undefined || parsedList.length == 0) {
                tempList.push(NEO.id);
                // saveFavouritesToStore(tempList);
                NEO.isInFavourites = true;
                setNEOFavouritesList([...tempList]);

            // List is populated, and therefore needs to be iterated through to avoid duplicate keys
            }else{
                for (let i = 0; i < parsedList.length; i++){
                    // If a match is found, it removes the existing key
                    if (parsedList[i] === NEO.id){
                        matchFound = true;
                        NEO.isInFavourites = false;
                        tempList.splice(i, 1);
                        // saveFavouritesToStore(tempList);
                        setNEOFavouritesList([...tempList]);
                        break;
                    }
                }

                // If no match is found, it is safe to add the key to the array
                if (!matchFound){
                    tempList.push(NEO.id);
                    NEO.isInFavourites = true;
                    // saveFavouritesToStore(tempList);
                    setNEOFavouritesList([...tempList]);
                }
            }

        } catch (e) {
            console.log(e);
        }
    };

    

    return (
        <UserContext.Provider
            value={{
                NEOFavouritesList,
                setNEOFavouritesList,
                handleNEOFavouritesListChange
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };