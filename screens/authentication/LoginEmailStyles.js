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
  formContainer: {
    backgroundColor: "white",
    width: wp(85),
    height: hp(35),
    position: "absolute",
    top: hp(52),
    borderRadius: wp(6),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: hp(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: wp(5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    justifyContent: "space-between",
  },
  inputWrapper: {
    marginBottom: hp(2),
  },
  input: {
    fontSize: wp(4),
    marginBottom: hp(1),
    color: COLORS.black,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: wp(2),
    padding: wp(2),
  },
  forgetPass: {
    fontFamily: "SemiBold",
    color: COLORS.black,
    marginTop: hp(1),
    fontWeight: "400",
    fontSize: wp(4),
    lineHeight: hp(2.4),
    textAlign: "center",
  },
  goBackContainer: {
    position: "absolute",
    top: hp(5),
    left: wp(5),
    zIndex: 999,
  },
  imageBackgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp(20),
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    borderRadius: wp(5),
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  authContent: {
    padding: wp(5),
  },
  switchAuthContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(3),
    top: hp(16),
  },
  switchAuthText: {
    fontSize: wp(4),
    color: COLORS.black,
    fontWeight: "300",
  },
  switchAuthLink: {
    fontSize: wp(4),
    color: COLORS.secondary,
    fontWeight: "700",
    marginLeft: wp(1.5),
  },
  buttons: {
    marginTop: hp(1),
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#E5E5E5",
  },
  orText: {
    fontFamily: "SemiBold",
    marginHorizontal: wp(2),
    color: "#5A5A5A",
    fontWeight: "300",
    fontSize: wp(4),
    lineHeight: hp(5.4),
  },
  privacyTextContaner: {
    fontFamily: "SemiBold",
    width: wp(75),
    opacity: 0.8,
    marginTop: hp(3),
    marginLeft: wp(2),
  },
  privacyText: {
    fontWeight: "500",
    fontSize: wp(3.5),
    color: "gray",
    lineHeight: hp(2.5),
  },
  policyLink: {
    fontFamily: "SemiBold",
    color: COLORS.secondary,
    marginRight: wp(1),
    marginLeft: wp(1),
  },
  passformContainer: {
    backgroundColor: "white",
    width: wp(85),
    position: "absolute",
    top: hp(60),
    borderRadius: wp(6),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: hp(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: wp(5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    justifyContent: "space-between",
  },
});

export default styles;
