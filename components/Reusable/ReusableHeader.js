import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { GoBack, ReusableArrow, ReusableText } from "../index";
import { COLORS, TEXT } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ReusableHeader = ({ headerText }) => {
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
              <View>
                <GoBack />
              </View>
              <View style={{ marginRight: wp(23), top: hp(0.3) }}>
                <ReusableText
                  text={headerText}
                  family="Medium"
                  size={TEXT.large}
                  color={COLORS.black}
                  align={"left"}
                  style={styles.headerText}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );

};

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
    paddingHorizontal: wp(10),
    paddingTop: hp(10),
  },
  LeftRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
  },
  headerText: {
    marginRight: wp(6), 
  },
});

export default ReusableHeader;
