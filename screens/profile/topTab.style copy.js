import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  headerContent: {
    top: 20,
  },
  headerImage: {
    width: "100%",
    height: 290,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
    backgroundColor: "white",
  },
  profile: {
    alignItems: "center",
    top: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    padding: 5,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: -80,
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    top:10,
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
});

export default styles;
