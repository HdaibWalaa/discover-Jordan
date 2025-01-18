
import { StyleSheet } from "react-native";
import { SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    width: SIZES.width,
    height: SIZES.height,
  },
  stack: {
    position: "absolute",
    bottom: 0,
    marginBottom: 60,
    marginHorizontal: 20,
  },
  imagePopular: {
    resizeMode: "cover",
    width: SIZES.width,
    height: SIZES.height,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  container1: {
    position: "absolute",
    bottom: 50,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: -780,
    left: 30,
  },

  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    alignContent: "center",
    left: 70,
  },
});

export default styles;
