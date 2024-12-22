import React from "react";
import { TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const NotificationIcon = ({ onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const iconSize = wp(10); 

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { width: iconSize, height: iconSize }]}
    >
      <Image
        source={require("../assets/images/icons/notificationBack.png")}
        style={styles.backgroundImage}
      />
      <Image
        source={require("../assets/images/icons/notification.png")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  icon: {
    width: "50%",
    height: "50%",
    zIndex: 1,
  },
});

export default NotificationIcon;
