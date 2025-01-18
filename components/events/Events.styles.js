import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  topRow: {
    position: "absolute",
    top: hp("9%"),
    left: wp("5%"),
    right: wp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.75%"),
    borderRadius: wp("5%"),
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#333",
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginLeft: wp("2%"),
  },
  fixedContent: {
    padding: wp("5%"),
    top: hp("-12%"),
  },
  scrollContent: {
    top: hp("5%"),
  },
  contentContainer: {
    padding: wp("5%"),
    top: hp("-2%"),
  },
  separator: {
    height: hp("0.12%"),
    backgroundColor: COLORS.lightGray,
    marginVertical: hp("14%"),
  },
  sectionTitle: {
    marginBottom: hp("1.25%"),
    fontSize: wp("5%"),
  },
  description: {
    marginBottom: hp("1.25%"),
    textAlign: "justify",
    fontSize: wp("4%"),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("1.25%"),
    marginBottom: hp("-1.25%"),
  },
  textContainer: {
    position: "absolute",
    top: hp("27%"),
    left: wp("5%"),
    right: wp("5%"),
    backgroundColor: COLORS.white,
    borderRadius: wp("3%"),
    padding: wp("3%"),
    paddingHorizontal: wp("4%"),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp("0.75%"),
    },
    shadowOpacity: 0.25,
    shadowRadius: wp("4%"),
    elevation: 5,
  },
  interestedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp("2%"),
  },
  interestedUser: {
    width: wp("5%"),
    height: wp("5%"),
    borderRadius: wp("2.5%"),
    marginRight: wp("1%"),
  },
  interestedText: {
    fontSize: wp("3.5%"),
    color: COLORS.primary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp("1%"),
  },
  userContainer: {
    position: "absolute",
    top: hp("-2%"),
    right: wp("2%"),
    borderRadius: wp("2.5%"),
  },
  infoContainer: {
    flexDirection: "row",
  },
  StatuseContaine: {
    left: wp("10%"),
    top: hp("2%"),
  },
  interestButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%"),
    marginBottom: hp("15%"),
  },
  interestButtonText: {
    fontSize: wp("5%"),
    color: COLORS.white,
    fontWeight: "bold",
  },
});
