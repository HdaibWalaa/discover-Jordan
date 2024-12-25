import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  headerImage: {
    width: wp("100%"),
    height: hp("35%"),
    borderBottomLeftRadius: wp("12%"),
    borderBottomRightRadius: wp("12%"),
    overflow: "hidden",
    backgroundColor: "white",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("7%"),
    paddingTop: hp("8%"),
    zIndex: 1,
  },
  iconButtonLeft: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: wp("2.5%"),
    borderRadius: wp("3%"),
    zIndex: 2,
  },
  iconButtonRight: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: wp("2.5%"),
    borderRadius: wp("3%"),
    zIndex: 2,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50, // Adjust the margin to lift the image
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  plusIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editText: {
    textAlign: "center",
    color: COLORS.gray,
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: wp("3%"),
    backgroundColor: COLORS.white,
    borderRadius: wp("7%"),
    marginHorizontal: wp("5.5%"),
    marginTop: hp("-13%"),
    paddingVertical: hp("1%"),
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center align the header text
    color: "#000", // Black text color
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#D1D1D1", // Lighter grey for borders
    marginVertical: 15, // More margin between inputs
    paddingBottom: 5,
    paddingHorizontal: 10, // Add horizontal padding
    backgroundColor: "#F9F9F9", // Slight background color for input
    borderRadius: 10, // Rounded corners
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    paddingVertical: 10,
    color: "#000", // Black text color
  },
  icon: {
    width: 20, // Icon size matching the design
    height: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 2,
    borderRadius: 12,
    width: "45%",
    justifyContent: "center",

    borderColor: COLORS.gray, // Yellow border for non-selected buttons
  },
  genderSelected: {
    borderColor: "#FCD228",
    backgroundColor: "#FCD22820", // Light transparent yellow when selected
  },
  selectedTags: {
    borderColor: "#FCD228",
    backgroundColor: "#FCD22820",
  },
  genderText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#000", // Black text color for gender options
  },
  button: {
    backgroundColor: "#FCD228", // Primary yellow button color
    paddingVertical: hp("2%"),
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    width: "100%", // Full-width button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Black text color for button
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  avatarImage: {
    width: 100, // Avatar size
    height: 100,
    borderRadius: 50, // Round avatar
    backgroundColor: "#FCD228", // Background color matching the theme
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 25,
    borderColor: "#FCD228",
    borderWidth: 2,
  },
  formHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  tag: {
    backgroundColor: "#F5F5F5", // Light gray background for non-selected tags
    padding: 10,
    margin: 5,
    borderRadius: 25, // Rounded shape
    borderWidth: 2,
    borderColor: "transparent", // No border by default
    flexDirection: "row", // Icon and text in row
    alignItems: "center", // Vertically center the content
    justifyContent: "center",
    width: wp("22%"),
    height: wp("10%"), // Adjust size as needed
  },
  selectedTag: {
    backgroundColor: "#FCD22820", // Light yellow background for selected tag
    borderColor: "#FCD228", // Yellow border for selected tags
  },
  tagIcon: {
    width: 20, // Adjust icon size
    height: 20,
    marginRight: 5, // Space between icon and text
  },
  tagText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000", // Black text color
  },
  button: {
    backgroundColor: "#FCD228",
    paddingVertical: hp("2%"),
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default styles;
