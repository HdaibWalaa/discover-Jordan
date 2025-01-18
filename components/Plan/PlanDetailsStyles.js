import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    padding: wp(4),
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("90%"),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    flex: 1,
    textAlign: "left",
    lineHeight: hp(2.5),
  },
  readMoreText: {
    color: "#00A6FF",
    fontSize: wp(3),
    fontWeight: "bold",
    marginLeft: wp(1),
  },
  daysTabs: {
    flexDirection: "row",
    marginBottom: hp(2),
    alignItems: "center",
  },
  dayTabContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
  },
  dayTab: {
    fontSize: wp(4),
    color: "#000",
  },
  dayTabActive: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#00A6FF",
  },
  activeIndicator: {
    marginTop: hp(0.5),
    width: wp(10),
    height: 2,
    backgroundColor: "#00A6FF",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(2),
  },
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#FFD700",
    borderRadius: wp(2),
    padding: wp(3),
    marginBottom: hp(2),
  },
  activityImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: wp(4.5),
    fontWeight: "bold",
  },
  activityLocation: {
    fontSize: wp(4),
    color: "#555",
  },
  activityTime: {
    fontSize: wp(4),
    color: "#555",
  },
  activityButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: wp(1.5),
    padding: wp(2),
  },
  activityButtonText: {
    color: "#fff",
    fontSize: wp(4),
  },
  errorText: {
    color: "red",
    fontSize: wp(4.5),
  },
  loadingText: {
    fontSize: wp(4.5),
  },
});

export default styles;
