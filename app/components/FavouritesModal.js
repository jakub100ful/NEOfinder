import React, { useContext, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList
} from "react-native";
import { UserContext } from "../provider/UserProvider";
import fetchNEOFavourites from '../functions/fetchNEOFavourites';
import ItemSeparator from '../components/ItemSeparator';
import FavouriteItem from '../components/FavouriteItem';
import CustomButton from "./CustomButton";


export default function FavouritesModal(props) {
    const user = useContext(UserContext);

    /**
     * Takes an id of a Near Earth Object and navigates to the Orbit screen to preview the NEO's orbit
     * @param {object} NEOid - NEO object to be previewed. This is passed to the new screen through the navigation prop.
     */
    const viewNEOInfo = (NEOid) => {
      console.log("Navigate!")
      props.navigation.navigate('Info', {NEOid: NEOid});
    }

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Saved NEOs</Text>

              {/* List of favourite NEOs */}
              <View style={{flex: 10, width: "100%", height: "100%"}}>
                <FlatList
                  style={styles.listView}
                  data={user.NEOFavouritesList}
                  keyExtractor={(item, index) => 'key'+index}
                  ItemSeparatorComponent={ItemSeparator}
                  refreshing={true}
                  renderItem={({item})=><FavouriteItem item={item} function={()=>{viewNEOInfo()}}/>}
                />
              </View>

              {/* Close Button */}
              <View style={styles.closeButtonWrapper}>
                <CustomButton 
                  title="CLOSE"
                  callback={() => {
                    props.callback()
                  }}
                />
              </View>
              
            </View>
          </View>
        </Modal>
      </View>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1d1135",
    borderRadius: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    height: "80%"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    margin: 15,
    textAlign: "center",
    fontFamily: "8-bit-Arcade-In",
    fontSize: 50,
    color: "#ba1e68",
  },
  listView: {
    backgroundColor: "purple"
  },
  closeButtonWrapper: {
    flex: 0.7, 
    flexDirection: "row",
    backgroundColor: "white",
  }
});