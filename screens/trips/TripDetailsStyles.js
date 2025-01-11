import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },

  descriptionContainer: {
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blue,
  },
  tabText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.blue,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  
});

export default styles;
