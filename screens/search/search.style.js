import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(1),
    top: wp(5),
  },
  backButton: {
    marginRight: wp(2.5),
    backgroundColor: COLORS.white,
    borderRadius: wp(5),
    padding: wp(2.3),
    borderWidth: wp(0.1),
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: wp(8),
    paddingLeft: wp(4),
    paddingRight: wp(10),
    height: hp(5),
    borderWidth: wp(0.1),
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    color: "#000",
  },
  clearButton: {
    position: "absolute",
    right: wp(2.5),
    padding: wp(1),
    zIndex: 1,
  },
  clearIcon: {
    width: wp(4),
    height: wp(4),
  },
  noItemsText: {
    fontSize: 16,
    color: "gray",
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: "center",
  },
  sectionContainer: {
    top: wp(5),
    marginBottom: wp(5),
  },
  sectionTitle: {
    marginBottom: wp(5),
  },
});
