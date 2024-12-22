import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  postButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  postButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  TimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  AgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default styles;
