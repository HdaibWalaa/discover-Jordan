// EditFormStyles.js
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    color: COLORS.black,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  avatarContainer: {
    alignSelf: "center",
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 2,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginBottom: 16,
    padding: 8,
    fontSize: SIZES.body3,
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderLabel: {
    fontSize: SIZES.body3,
    marginBottom: 8,
  },
  genderButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedGenderButton: {
    backgroundColor: COLORS.primary,
  },
  genderButtonText: {
    fontSize: SIZES.body3,
    color: COLORS.primary,
  },
  selectedGenderButtonText: {
    color: COLORS.white,
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  updateButtonText: {
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
});

export default styles;
