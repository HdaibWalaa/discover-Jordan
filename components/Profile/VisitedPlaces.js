import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./VisitedPlaces.style";
import { ReusableText } from "../../components";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import { COLORS, TEXT } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import SelectPlace from "../trip/SelectPlace";
import BASE_URL from "../../hook/apiConfig";

const VisitedPlaces = ({ visitedPlaces, refreshProfile }) => {
  const authCtx = useContext(AuthContext);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Visited places:", visitedPlaces);
  }, [visitedPlaces]);

  const handleAddPlace = async () => {
    if (!selectedPlaceId) {
      Alert.alert("Please select a place before adding.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/visited/place/${selectedPlaceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );
      refreshProfile();
      setModalVisible(false);
      setSelectedPlaceId(null);
    } catch (error) {
      Alert.alert("Error", "Unable to add the place.");
    }
  };

  const handleDeletePlace = async (placeId) => {
    try {
      await axios.delete(`${BASE_URL}/visited/place/${placeId}/delete`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      refreshProfile();
    } catch (error) {
      Alert.alert("Error", "Unable to delete the place.");
    }
  };

  const handleMarkerPress = (placeId, placeName) => {
    Alert.alert(
      "Delete Place",
      `Are you sure you want to delete "${placeName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeletePlace(placeId),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 31.9539, // Default to Jordan's latitude
            longitude: 35.9106, // Default to Jordan's longitude
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          {visitedPlaces &&
            visitedPlaces.map((place, index) => (
              <Marker
                key={index.toString()}
                coordinate={{
                  latitude: parseFloat(place.latitude),
                  longitude: parseFloat(place.longitude),
                }}
                title={place.name}
                onPress={() => handleMarkerPress(index, place.name)} // Handle marker press
              />
            ))}
        </MapView>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Place</Text>
            <SelectPlace
              label="Search Place"
              iconSource={require("../../assets/images/icons/Search1.png")}
              iconSource2={require("../../assets/images/icons/Iconly.png")}
              onValueChange={(placeId) => setSelectedPlaceId(placeId)}
              width={300}
            />
            <TouchableOpacity
              style={styles.addButton1}
              onPress={handleAddPlace}
            >
              <Text style={styles.addButtonText}>Add Selected Place</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VisitedPlaces;
