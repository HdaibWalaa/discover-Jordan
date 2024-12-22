import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

const reusable = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(5), // Adjusted margin for responsiveness
  },
  rowWithSpace: (justifyContent) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: justifyContent,
  }),
  header1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(1), // Adjusted margin to prevent clipping
    marginTop: hp(1), // Adjusted margin to prevent clipping
    width: wp("87%"),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(1), // Adjusted margin to prevent clipping
  },
  typeContainer: {
    paddingVertical: 12,
  },
});

export default reusable;
