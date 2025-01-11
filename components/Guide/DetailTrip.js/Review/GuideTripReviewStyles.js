import { StyleSheet } from "react-native";
import { COLORS, TEXT, SIZES } from "../../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  reviewItem: {
    marginTop: hp("0.5%"),
    marginBottom: hp("1%"),
    padding: wp("4%"),
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  avatar: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("7%"),
    marginRight: wp("3%"),
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: TEXT.large,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  date: {
    fontSize: TEXT.small,
    color: COLORS.gray,
    marginTop: hp("0.5%"),
  },
  ratingStars: {
    flexDirection: "row",
    marginLeft: wp("2%"),
  },
  star: {
    fontSize: TEXT.medium,
  },
  comment: {
    fontSize: TEXT.small,
    color: COLORS.dark,
    lineHeight: hp("2.5%"),
    marginLeft: wp("1%"),
    marginTop: hp("1%"),
  },
  actions: {
    flexDirection: "row",
    marginTop: hp("2%"),
    gap: wp("2%"),
    marginLeft: wp("1%"),
  },
  actionIcon: {
    width: wp("5%"),
    height: wp("5%"),
    resizeMode: "contain",
  },
  actionText: {
    fontSize: TEXT.small,
    marginLeft: wp("1%"),
    color: COLORS.gray,
  },
});

export default styles;
