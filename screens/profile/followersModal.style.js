import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  followerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  followerName: {
    flex: 1,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default styles;
