import React, { useState } from "react";
import { TouchableOpacity, Image, Alert } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const FilterButton = () => {
   const navigation = useNavigation();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleFilterPress = async () => {
    try {
      setIsFetchingLocation(true);

      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setIsFetchingLocation(false);
        return;
      }

      // Fetch current location with high accuracy
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      // Log latitude and longitude
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      // Reverse geocode to get the city/region
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const { city } = reverseGeocode[0];

        // Log the city along with the coordinates
        if (city) {
          console.log(
            `Location: ${city}, Latitude: ${latitude}, Longitude: ${longitude}`
          );
        } else {
          console.log("City information not available");
        }

        // Optionally show the location in an alert
        Alert.alert(
          "Current Location",
          city ? `City: ${city}` : "City information not available"
        );
      } else {
        Alert.alert("Error", "Unable to fetch the region information.");
      }

      setIsFetchingLocation(false);
    } catch (error) {
      console.error("Error fetching location:", error);
      setIsFetchingLocation(false);
      Alert.alert("Error", "Failed to get the location.");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("FilterComponent")}
      disabled={isFetchingLocation}
    >
      <Image
        source={require("../../assets/images/icons/Filter.png")}
        style={styles.Filter}
      />
    </TouchableOpacity>
  );
};

const styles = {
  Filter: {
    width: 30,
    height: 30,
  },
};

export default FilterButton;