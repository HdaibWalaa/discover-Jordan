import React from "react";
import { View, ImageBackground, StyleSheet, Text, Image } from "react-native";
import { GoBack } from "../index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const PrivacyPolicyHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../../assets/images/header1.png")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.TopHeader}>
            <View style={styles.LeftRow}>
              <View style={styles.textContainer}>
                <Text style={styles.subTitle}>OUR</Text>
                <View style={styles.titleRow}>
                  <Text style={styles.mainTitle}>Privacy And Policy</Text>
                  <Image
                    source={require("../../assets/images/icons/privacypolicy.png")} // Update the path if necessary
                    style={styles.icon}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default PrivacyPolicyHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    borderBottomLeftRadius: hp(4),
    borderBottomRightRadius: hp(4),
    overflow: "hidden",
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: hp(20),
  },
  TopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(6),
    paddingTop: hp(10),
  },
  LeftRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: wp(10),
  },
  subTitle: {
    fontSize: 18,
    color: "#555",
    fontWeight: "400",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginRight: wp(13),
  },
  icon: {
    width: 40, // Adjust size as needed
    height: 40, // Adjust size as needed
  },
});
