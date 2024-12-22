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
    paddingHorizontal: wp(2), 
    top:wp(-7),
  },
  backButton: {
    marginRight: wp(2.5), // 10% of screen width
    backgroundColor: "#F2F2F7",
    borderRadius: wp(5), // 20% of screen width
    padding: wp(2), // 8% of screen width
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: wp(8), // 30% of screen width
    paddingLeft: wp(4), // 15% of screen width
    paddingRight: wp(10), // 40% of screen width
    height: hp(5), // 40% of screen height
  },
  input: {
    flex: 1,
    fontSize: wp(4), // Responsive font size
    color: "#000",
  },
  clearButton: {
    position: "absolute",
    right: wp(2.5), // Positioning based on screen width
    padding: wp(1), // 5% of screen width
    zIndex: 1,
  },
  clearIcon: {
    width: wp(4), // 16% of screen width
    height: wp(4), // 16% of screen height
  },
  noItemsText: {
    fontSize: 16,
    color: "gray",
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: "center",
  },
});
