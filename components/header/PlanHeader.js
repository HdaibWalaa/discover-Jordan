import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { GoBack } from "../index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS,TEXT,SIZES } from "../../constants/theme";
import ReusableText from "../../components/Reusable/ReusableText";

const PlanHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../../assets/images/header1.png")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.TopHeader}>
            {/* Left Section: Go Back Button + "Your Plan" Text */}
            <View style={styles.leftSection}>
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.goBack()}
              >
                <GoBack />
              </TouchableOpacity>
              <ReusableText
                text={"Your Plan"}
                family={"SemiBold"}
                size={TEXT.xLarge}
                color={COLORS.black}
                align={"left"}
                style={styles.mainTitle}
              />
            </View>

            {/* Right Section: Icon Image */}
            <Image
              source={require("../../assets/images/icons/Date.png")}
              style={styles.icon}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default PlanHeader;

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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(10),
    paddingTop: hp(10),
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackButton: {
    marginRight: wp(10),
    top: hp(-2),
  },
  mainTitle: {
    left: wp(5),
  },
  icon: {
    width: wp(8),
    height: wp(8),
  },
});
