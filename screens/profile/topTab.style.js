import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  headerImage: {
    width: wp("100%"),
    height: hp("35%"),
    borderBottomLeftRadius: wp("12%"),
    borderBottomRightRadius: wp("12%"),
    overflow: "hidden",
    backgroundColor: "white",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("7%"),
    paddingTop: hp("8%"),
    zIndex: 1,
  },
  iconButtonLeft: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: wp("2.5%"),
    borderRadius: wp("3%"),
    zIndex: 2,
  },
  iconButtonRight: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: wp("2.5%"),
    borderRadius: wp("3%"),
    zIndex: 2,
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("-13%"),
    flex: 1,
  },
  image: {
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: wp("12.5%"),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: wp("3%"),
    backgroundColor: COLORS.white,
    borderRadius: wp("5%"),
    marginHorizontal: wp("7.5%"),
    marginTop: hp("-8%"),
    paddingVertical: hp("2.5%"),
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: hp("2.5%"),
  },
  followBox: {
    alignItems: "center",
  },
  followCount: {
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  followLabel: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: hp("1%"),
  },
  scrollContainer: {
    paddingBottom: hp("2%"),
    padding: wp("3%"),
    top: hp("2%"),
  },
  bottomSpacing: {
    height: hp("10%"),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
  },
  modalContent: {
    width: "80%",
    height: hp("50%"),
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
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
