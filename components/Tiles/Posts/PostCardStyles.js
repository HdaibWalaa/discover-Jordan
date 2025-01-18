import { StyleSheet, Dimensions } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    padding: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the top
    paddingVertical: 13,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerDetails: {
    flex: 1,
    justifyContent: "flex-start",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Add space between username/createdAt and title
  },
  username: {
    marginRight: 5,
  },
  moreIcon: {
    marginLeft: 10,
    padding: 5,
    alignSelf: "flex-start", // Aligns with the top of the header
  },
  contentContainer: {
    flexDirection: "row", // Align text and toggle horizontally
    flexWrap: "wrap", // Allow wrapping if needed
    marginBottom: 15,
  },
  toggleText: {
    fontSize: TEXT.xSmall,
    color: COLORS.gray,
  },
  mediaContainer: {
    position: "relative",
    marginVertical: 10,
  },
  media: {
    width: SCREEN_WIDTH - 55,
    height: 250,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  fullMedia: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    resizeMode: "contain",
  },
  imageCounterContainer: {
    position: "absolute",
    bottom: 35,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageCounterText: {
    color: COLORS.white,
    fontSize: TEXT.small,
    fontWeight: "bold",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensure spacing between left and right sections
    alignItems: "center", // Align items vertically in the center
    marginTop: 15,
    paddingHorizontal: 10,
  },
  actionsLeft: {
    flexDirection: "row",
    alignItems: "center", // Align "like" and "comments" icons vertically
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: TEXT.medium,
    color: COLORS.gray,
    marginLeft: 5, // Space between the icon and text
  },
});

export default styles;
