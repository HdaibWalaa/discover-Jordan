import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export default StyleSheet.create({
  tileContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: COLORS.gray,
  },
  rating: {
    fontSize: 14,
    color: COLORS.primary,
  },
  reviews: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
