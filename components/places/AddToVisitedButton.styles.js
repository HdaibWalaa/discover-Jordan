import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  button: {
    padding: wp("2%"),
    borderRadius: wp("2%"),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  icon: {
    width: wp("8%"),
    height: wp("8%"),
  },
});

export default styles;
