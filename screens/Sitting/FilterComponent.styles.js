import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    top: hp("9%"),
    flex: 1,
    marginHorizontal: wp(5),
    backgroundColor: COLORS.white,
  },
  CancelButton: {
    backgroundColor: "rgba(255, 230, 1, 0.43)",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: hp("1%"),
  },
  icon: {
    height: hp("2%"),
    width: wp("5%"),
  },
  Dropicon: {
    height: hp("2%"),
    width: wp("5%"),
    left: wp(2),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(1),
    marginTop: hp(2),
    width: wp("87%"),
    paddingHorizontal: wp(2),
  },
  Catdropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: COLORS.white,
    width: wp("40%"),
  },
  Subdropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: COLORS.white,
    width: wp("40%"),
  },
  dropdownPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownList: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginTop: 5, // Space between dropdown button and list
    maxHeight: hp(20), // Limit the height of the dropdown
    overflow: "hidden", // Ensures it doesn't spill over
    width: wp("40%"), // Match the dropdown button's width
    alignSelf: "flex-start", // Align to the button
  },
  dropdownItem: {
    flexDirection: "column", // Stack image and text
    alignItems: "center", // Center align items
    marginHorizontal: 10, // Add space between items
  },
  dropdownImage: {
    width: 50,
    height: 50,
    marginBottom: 5, // Space between image and text
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
  },
  selectedItem: {
    backgroundColor: COLORS.primaryLight,
  },
  checkMark: {
    fontSize: 16,
    color: COLORS.primary,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.white,
    marginBottom: 15,
  },
  searchButton: {
    backgroundColor: "#FCD228",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  map: {
    top: 80,
    width: width - 40,
    height: height / 2,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 15,
  },
});

export default styles;
