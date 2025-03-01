import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    width: wp(20),
    height: hp(20),
    position: "absolute",
    top: hp(15),
    gap: hp(1),
  },
  title: {
    fontFamily: "Bold",
    fontSize: wp(10), // Scaled font size
    lineHeight: hp(7),
    letterSpacing: 0,
    textAlign: "center",
    width: wp(50),
    height: hp(40),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp("25%"),
  },
  formContainer: {
    backgroundColor: "white",
    width: wp("85%"),
    height: hp("43%"),
    position: "absolute",
    top: hp("46%"),
    borderRadius: wp("6%"),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    padding: wp("5%"),
    justifyContent: "space-between",
  },
  goBackContainer: {
    position: "absolute",
    top: hp("6%"),
    left: wp("6%"),
    zIndex: 999,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    minHeight: 200, // Ensure there's enough height for all content
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: wp("2%"),
    right: wp("2%"),
  },
  closeButtonText: {
    fontSize: wp("5%"),
    color: COLORS.primary,
  },
  modalTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  modalMessage: {
    fontSize: wp("4%"),
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  resendButton: {
    backgroundColor: COLORS.primary,
    padding: hp("1.5%"),
    borderRadius: wp("2%"),
  },
  resendButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
  input: {
    height: 40, // Define a proper height
    width: "90%", // Use a percentage or fixed width
    borderColor: "gray", // Add a visible border
    borderWidth: 1, // Ensure the border is visible
    borderRadius: 5, // Add rounded corners
    paddingHorizontal: 10, // Add padding for better usability
    marginVertical: 10, // Add margin for spacing
    backgroundColor: "white", // Make the background visible
  },
});

export default styles;
