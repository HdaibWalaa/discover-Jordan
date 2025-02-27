import { StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  description: {
    lineHeight: 24,
    marginBottom: 10,
    textAlign: "left",
  },
  readMoreText: {
    color: COLORS.primary,
    fontFamily: "Medium",
    fontSize: TEXT.small,
    marginBottom: 20,
  },
  daysTabs: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: TEXT.medium,
    fontFamily: "Medium",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
    fontSize: TEXT.medium,
    fontFamily: "Medium",
  },

  // Activity Card Styles
  activityCardContainer: {
    marginBottom: 16,
    width: "100%",
  },
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#FFCD29", // Yellow background for activity cards
    borderRadius: 16,
    overflow: "hidden",
    minHeight: 100,
  },
  activityIconContainer: {
    width: 60,
    backgroundColor: "#FFCD29", // Slightly darker yellow for the icon section
    justifyContent: "center",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
    padding: 16,
  },
  activityTitle: {
    fontSize: TEXT.large,
    fontFamily: "Bold",
    marginBottom: 8,
    color: COLORS.black,
  },
  activityLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  activityLocationText: {
    fontSize: TEXT.medium,
    fontFamily: "Medium",
    marginLeft: 6,
    color: COLORS.black,
  },
  activityTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityTimeText: {
    fontSize: TEXT.medium,
    fontFamily: "Medium",
    marginLeft: 6,
    color: COLORS.black,
  },
  activityImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  activityDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityDetailsColumn: {
    flex: 1,
  },
  activityActionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  // Timeline & connectors
  timelineContainer: {
    position: "absolute",
    left: 30,
    top: 0,
    bottom: 0,
    width: 2,
    alignItems: "center",
    zIndex: 1,
  },
  timelineConnector: {
    position: "absolute",
    width: 2,
    backgroundColor: "#F0F0F0",
    top: 40,
    bottom: 0,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFCD29",
    borderWidth: 2,
    borderColor: "#FFF",
    position: "absolute",
    bottom: 0,
  },

  // Plan Days Tabs
  daysTabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dayTab: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  dayTabText: {
    fontSize: TEXT.medium,
    fontFamily: "Medium",
    color: COLORS.grey,
  },
  dayTabTextActive: {
    fontSize: TEXT.medium,
    fontFamily: "Bold",
    color: COLORS.secondary,
  },
  dayTabIndicator: {
    height: 3,
    backgroundColor: COLORS.secondary,
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    borderRadius: 3,
  },
  dayTabsScrollContainer: {
    flexDirection: "row",
  },
  dayTabsArrow: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default styles;
