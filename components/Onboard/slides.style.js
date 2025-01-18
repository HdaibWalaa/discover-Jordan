import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
    width: SIZES.width,
    height: SIZES.height,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  stack: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  dotContainer: {
    marginHorizontal: 5,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    opacity: 0.5,
  },
  activeDotWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 20,
    height: 20,
  },
  activeDotImageBackground: {
    position: "absolute",
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    position: "absolute",
  },
  arrowContainer: {
    position: "absolute",
    bottom: 100,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    width: 65,
    height: 65,
    resizeMode: "contain",
  },
});

export default styles;
