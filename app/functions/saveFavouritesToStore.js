import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Takes a list of favourite NEOs and stores in local storage
 * @param {list} NEOFavouritesList - A new list of favourite NEOs to be saved in storage
 */
const saveFavouritesToStore = async (NEOFavouritesList) => {
    await AsyncStorage.setItem('userAddedNEOList', JSON.stringify(NEOFavouritesList));
}

export default saveFavouritesToStore;