import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme"; // Update path as per your folder structure

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  posts: {
    fontSize: 14,
    color: COLORS.gray,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 14,
  },
});

export default styles;
