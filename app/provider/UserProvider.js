import React, { useEffect } from 'react';
import { useState } from 'react';
import getFavouritesFromStore from '../functions/getFavouritesFromStore';
import handleNEOInFavouriteState from '../functions/handleNEOInFavouriteState';
import saveFavouritesToStore from '../functions/saveFavouritesToStore';

const UserContext = React.createContext();

const UserProvider = (props) => {
    
    const [NEOFavouritesList, setNEOFavouritesList] = useState(null);
    const handleFavouriteListChange = (NEO) => {handleNEOInFavouriteState(NEO, NEOFavouritesList, setNEOFavouritesList)}

    // Loads the list from store into the state hook
    useEffect(() => {
        const fetchData = async () => {
            console.log("List loaded");
            const result = await getFavouritesFromStore().then((list)=>{return list});
            setNEOFavouritesList(result);
        };
        fetchData();
      }, []);

    // Saves the current list to store if an update occurs 
    useEffect(() => {
        if (NEOFavouritesList != null){
            console.log("List saved");
            saveFavouritesToStore(NEOFavouritesList);
        }
      }, [NEOFavouritesList]);

    

    return (
        <UserContext.Provider
            value={{
                NEOFavouritesList,
                setNEOFavouritesList,
                handleFavouriteListChange
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };