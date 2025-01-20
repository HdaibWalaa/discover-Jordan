import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    borderRadius: wp("7.5%"), // Round the corners of the image
    overflow: "hidden", // Ensure the image is clipped within the rounded corners
  },
  topRow: {
    position: "absolute",
    top: hp("8%"),
    left: wp("7%"),
    right: wp("7%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Slightly transparent background
    borderRadius: wp("5%"),
    padding: wp("2%"),
  },
  directionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly transparent background
    borderRadius: wp("5%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
    flexDirection: "row",
    alignItems: "center",
  },
  directionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#333",
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginLeft: wp("2%"),
  },
  icon: {
    width: wp("5%"),
    height: hp("3%"),
  },
  
});

export default styles;
