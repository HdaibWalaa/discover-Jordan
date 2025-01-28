import React from "react";
import { View, ImageBackground, StyleSheet, Text, Image } from "react-native";
import { GoBack, RusableWhite } from "../index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import { ReusableText } from "../index";

const SuggestPlaceHeader = () => {
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
                <ReusableText
                  text={"Hey!"}
                  family={"Medium"}
                  size={TEXT.medium}
                  color={COLORS.gray}
                  align={"left"}
                  style={styles.subTitle}
                />
                <View style={styles.titleRow}>
                  <ReusableText
                    text={"recommend a new place"}
                    family={"SemiBold"}
                    size={TEXT.large}
                    color={COLORS.black}
                    align={"left"}
                    style={styles.mainTitle}
                  />
                  <Image
                    source={require("../../assets/images/icons/map.png")}
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

export default SuggestPlaceHeader;

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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainTitle: {
    marginRight: wp(20),
  },
  icon: {
    width: 40,
    height: 40,
  },
});
