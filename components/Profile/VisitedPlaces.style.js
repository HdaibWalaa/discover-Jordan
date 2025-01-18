import { StyleSheet } from "react-native";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  mapContainer: {
    width: "100%",
    height: 200, // Adjust the height as needed
    borderRadius: 20, // Rounded corners
    overflow: "hidden", // Ensures the map does not bleed outside the rounded corners
    marginTop: 15,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  visitedPlacesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: TEXT.large,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.black,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    textAlign: "center",
    padding: hp(2),
  },
  searchInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalPlaceOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    width: "100%",
  },
  modalPlaceImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalPlaceOptionText: {
    fontSize: TEXT.medium,
    color: COLORS.black,
  },
  addButton1: {
    backgroundColor: "#FCD228",
    paddingVertical: hp(2),
    borderRadius: wp(1),
    alignItems: "center",
    top: hp(2),
    width: 240,
    borderRadius: 20,
  },
});

export default styles;
