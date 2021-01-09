import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Returns the most up to date favourite list from local storage
 * @param {function callback(returnedList) { return returnedList }} - A callback to return the list
 */
const getFavouritesFromStore = async () => {
    try {
        const fetchedList = await AsyncStorage.getItem('userAddedNEOList')
        .then((favouritesList)=>{
            const parsedList = favouritesList == null ? [] : JSON.parse(favouritesList).map((NEO) => {return NEO});
            return parsedList;
        });
        return fetchedList;
    }catch (error) {
        console.log(error);
    }
    
}

export default getFavouritesFromStore;