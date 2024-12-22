import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginBottom: hp(3),
  },
  timelineContainer: {
    alignItems: "center",
    width: wp(20),
    position: "relative",
  },
  timelineBackground: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -19 }],
    backgroundColor: COLORS.primary,
    borderRadius: wp(5),
    width: wp(17),
    height: wp(10),
    zIndex: 0,
    left: wp(4),
  },
  timelineIcon: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  timelineConnector: {
    position: "absolute",
    top: "73%",
    bottom: 0,
    left: "50%",
    width: 2,
    height: 90,
    backgroundColor: COLORS.primary,
    zIndex: -1,
  },
  dot: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(2),
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: "100%",
    left: "49%",
    transform: [{ translateX: -wp(1) }, { translateY: -wp(1) }],
    zIndex: 2,
  },
  cardContent: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: wp(5),
    padding: wp(3),
    flex: 1,
    alignItems: "center",
    marginLeft: -wp(5),
  },
  activityImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: "black",
  },
  activityLocation: {
    fontSize: wp(4),
    color: "#333",
    marginTop: hp(0.5),
  },
  activityTime: {
    fontSize: wp(4),
    color: "#333",
    marginTop: hp(0.5),
  },
  activityButton: {
    padding: wp(2),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: wp(80),
    padding: wp(5),
    backgroundColor: "#fff",
    borderRadius: wp(4),
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: hp(2),
    color: COLORS.black,
  },
  modalText: {
    fontSize: wp(4),
    color: COLORS.gray,
    marginBottom: hp(2),
  },
  modalCloseButton: {
    position: "absolute",
    top: wp(3),
    right: wp(3),
  },
});

export default styles;
