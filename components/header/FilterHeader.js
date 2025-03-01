import React from "react";
import { View, ImageBackground, StyleSheet, Text, Image } from "react-native";
import { GoBack, RusableWhite } from "../index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

const ContactusHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../../assets/images/header1.png")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.TopHeader}>
            <GoBack />
            <View style={styles.LeftRow}>
              <View style={styles.textContainer}>
                <Text style={styles.subTitle}>Hey!</Text>
                <View style={styles.titleRow}>
                  <Text style={styles.mainTitle}>Search Filter</Text>
                  <Image
                    source={require("../../assets/images/icons/contactUs.png")}
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

export default ContactusHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
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
    marginLeft: wp(3),
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
    marginRight: wp(40),
  },
  icon: {
    width: 40,
    height: 40,
  },
});
