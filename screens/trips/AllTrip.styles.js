import { StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  safeArea: {
    marginTop: 50,
  },
  headerTextContainer: {
    width: 170,
  },
  createButtonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  createButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.gray,
    overflow: "hidden",
    marginHorizontal: 2,
    backgroundColor: COLORS.white,
  },
  dateIcon: {
    width: 30,
    height: 30,
  },
  listContainer: {
    paddingVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(5),
  },
  noDataVideo: {
    width: wp(80),
    height: hp(30),
  },
  noDataText: {
    fontSize: TEXT.medium,
    color: COLORS.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  tripCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  tripPlace: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  tripPrice: {
    fontSize: 14,
    color: COLORS.primary,
  },
  tripDate: {
    fontSize: 14,
    color: COLORS.gray,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  acceptText: {
    color: "white",
  },
  cancelText: {
    color: "white",
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  closeText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  noInvitationsText: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: "center",
    marginTop: 20,
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
