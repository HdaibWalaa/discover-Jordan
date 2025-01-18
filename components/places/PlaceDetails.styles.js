import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  buttonText: {
    color: "#333",
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginLeft: wp("2%"),
  },
  icon: {
    width: wp("5%"),
    height: hp("2.5%"),
  },
  fixedContent: {
    padding: wp("5%"),
  },

  contentContainer: {
    padding: wp("5%"),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  sectionTitle: {
    marginBottom: hp("1.3%"),
  },
  description: {
    marginBottom: hp("1.3%"),
    textAlign: "justify",
    fontFamily: "Regular",
    fontSize: wp("4%"),
    color: COLORS.gray,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: hp("1.3%"),
  },
  tab: {
    flex: 1,
    paddingVertical: hp("1.3%"),
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: COLORS.lightGray,
  },
  activeTab: {
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: "SemiBold",
  },
  tabContent: {
    paddingVertical: hp("2%"),
    alignItems: "center",
  },
 
});

export default styles;
