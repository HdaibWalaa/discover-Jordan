import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  cardContainer: {
    top: hp("0.5%"), // Adjusted height percentage
    left: wp("2%"), // Adjusted width percentage
    marginBottom: hp("2%"), // Adjusted margin for responsiveness
    width: wp("50%"), // Responsive width
    height: hp("27%"), // Responsive height
    borderRadius: wp("4%"), // Responsive border radius
    backgroundColor: COLORS.lightWhite,
    marginRight: wp("2%"), // Adjusted margin for responsiveness
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") }, // Responsive shadow offset
    shadowOpacity: 0.3,
    shadowRadius: wp("1%"), // Responsive shadow radius
    elevation: 5,
    overflow: "visible",
  },
  imageContainer: {
    position: "relative",
    borderTopLeftRadius: wp("4%"), // Responsive border radius
    borderTopRightRadius: wp("4%"), // Responsive border radius
    overflow: "hidden",
    paddingHorizontal: wp("1%"), // Responsive padding
    paddingVertical: hp(.5), // Responsive padding
  },
  iconContainer: {
    position: "absolute",
    top: hp("2%"), // Adjusted top for responsiveness
    left: wp("3%"), // Adjusted left for responsiveness
    right: wp("3%"), // Adjusted right for responsiveness
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    paddingHorizontal: wp("3%"), // Responsive padding
    paddingVertical: hp(.5), // Responsive padding
  },
});

export default styles;
