import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  description: {
    lineHeight: 24,
    marginBottom: 10,
  },
  readMoreText: {
    color: COLORS.primary,
    fontFamily: "Medium",
    fontSize: TEXT.small,
  },
  daysTabs: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  dayTabContainer: {
    marginRight: 25,
    paddingBottom: 10,
  },
  dayTab: {
    fontFamily: "Medium",
    fontSize: TEXT.medium,
    color: COLORS.grey,
  },
  dayTabActive: {
    fontFamily: "Bold",
    fontSize: TEXT.medium,
    color: COLORS.primary,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.primary,
  },
  iconWrapper: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineContainer: {
    width: 40,
    alignItems: "center",
    marginRight: 10,
    position: "relative",
  },
  timelineBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: COLORS.lightGrey,
  },
  timelineIcon: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  activityImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: "Bold",
    fontSize: 16,
    marginBottom: 5,
  },
  activityLocation: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  activityTime: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.grey,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontFamily: "Bold",
    fontSize: 18,
    marginBottom: 10,
  },
  modalText: {
    fontFamily: "Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default styles;
