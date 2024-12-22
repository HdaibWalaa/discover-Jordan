import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FFF9E5",
    borderColor: "#FFD700",
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: "#FFD700",
  },
  inputContainer: {},
  inputLabel: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  addMediaContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  addMediaButton: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  addMediaIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  addMediaText: {
    fontSize: 16,
    textAlign: "center",
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
    marginBottom: 20,
  },
  privacyIconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  privacyIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  privacyText: {
    fontSize: 16,
  },
  privacyLabel: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 5,
  },
  dropdownIcon: {
    width: 15,
    height: 15,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  postButton: {
    backgroundColor: "#FFD700",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 300,
  },
  postButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  mediaPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  mediaPreviewWrapper: {
    marginRight: 10,
    marginBottom: 10,
    position: "relative",
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default styles;
