import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Linking, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AddToVisitedButton from "../../components/places/AddToVisitedButton";
import { COLORS } from "../../constants/theme";

const BottomSection = ({ placeId, visited, refresh, googleMapUrl }) => {
  
  const handleDirectionPress = () => {
    if (googleMapUrl) {
      Linking.openURL(googleMapUrl)
        .then(() => console.log("Opened Google Maps:", googleMapUrl))
        .catch((error) => {
          console.error("Error opening Google Maps:", error);
          Alert.alert("Error", "Unable to open Google Maps. Please try again.");
        });
    } else {
      Alert.alert("No Map URL", "Google Maps URL is not available for this location.");
    }
  };

  return (
    <View style={styles.bottomSection}>
      <AddToVisitedButton placeId={placeId} visited={visited} refreshProfile={refresh} />
      
      <TouchableOpacity onPress={handleDirectionPress} style={styles.directionButton}>
        <View style={styles.directionButtonContent}>
          <Image
            source={require("../../assets/images/icons/sendrtip.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSection;

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: "row",
    paddingVertical: wp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  directionButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp(2),
    borderRadius: wp(4),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp(4),
  },
  directionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: wp(6),
    height: wp(6),
    tintColor: COLORS.black,
  },
});
