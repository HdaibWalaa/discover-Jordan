import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    width: wp(20),
    height: hp(20),
    position: "absolute",
    top: hp(15),
    gap: hp(1),
  },
  title: {
    fontFamily: "Bold",
    fontSize: wp(10), // Scaled font size
    lineHeight: hp(7),
    letterSpacing: 0,
    textAlign: "center",
    width: wp(50),
    height: hp(40),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp("25%"),
  },
  formContainer: {
    backgroundColor: "white",
    width: wp("85%"),
    height: hp("55%"),
    position: "absolute",
    top: hp("20%"),
    borderRadius: wp("6%"),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    padding: wp("5%"),
    justifyContent: "space-between",
  },
  goBackContainer: {
    position: "absolute",
    top: hp("6%"),
    left: wp("6%"),
    zIndex: 999,
  },
});

export default styles;
