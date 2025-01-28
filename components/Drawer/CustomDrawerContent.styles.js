import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/theme";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingHorizontal: 30,
    width: width * 0.8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    left: 20,
    gap: 10,
   
  },
});

export default styles;
