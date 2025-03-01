import { StyleSheet } from "react-native";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium,
    paddingHorizontal: wp("5%"),
    marginBottom:170,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    width: wp("50%"),
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  addReviewContainer: {
    marginTop: SIZES.medium,
  },
  addHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: SIZES.small,
  },
  userName: {
    fontSize: TEXT.medium,
    fontFamily: "SemiBold",
    color: COLORS.black,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: SIZES.small,
  },
  starButton: {
    marginHorizontal: 3,
  },
  star: {
    fontSize: 25,
    color: COLORS.gray,
  },
  filledStar: {
    color: COLORS.primary,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
    borderStyle: "solid",
    paddingVertical: SIZES.small,
    marginBottom: SIZES.medium,
  },
  reviewContainer: {
    marginBottom: SIZES.medium,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
  },
  profileDetailsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },

  reviewAvatar: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginRight: 10, // Space between avatar and text
  },
  profileDetails: {
    justifyContent: "center", // Vertically align text
  },
  createdAt: {
    marginTop: 2,
  },
  reviewRating: {
    padding: 9,
    width: wp("30%"),
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: COLORS.grey2,
    left: 50,
  },
  comment: { left: 50, alignItems: "center", paddingVertical: 13 },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: SIZES.small,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: "auto",
    marginTop: 5,
  },
  menuButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  menuText: {
    color: COLORS.white,
    fontSize: TEXT.small,
    fontFamily: "SemiBold",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionItem: {
    borderRadius: 8,
    backgroundColor: COLORS.grey2,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  likeSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  dislikeSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  actionCount: {
    marginTop: 5,
    textAlign: "center",
  },
  noReviewsContainer:{
    paddingVertical:20,
  }
});

export default styles;