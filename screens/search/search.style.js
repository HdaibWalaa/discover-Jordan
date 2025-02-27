import { StyleSheet } from "react-native";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(3),
    top: wp(5),
  },
  sectionTitle: {
    marginLeft: SIZES.medium,
    marginBottom: SIZES.small,
    fontSize: wp(4.5),
  },
  loadingOverlay: {
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    textAlign: "center",
    marginVertical: SIZES.medium,
    fontSize: wp(4),
    fontWeight: "500",
    color: COLORS.gray,
  },
  noDataSubText: {
    textAlign: "center",
    fontSize: wp(3.5),
    color: COLORS.gray,
    opacity: 0.8,
  },
  backButton: {
    marginRight: wp(2.5),
    backgroundColor: COLORS.white,
    borderRadius: wp(5),
    padding: wp(2.3),
    borderWidth: wp(0.1),
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: wp(8),
    paddingLeft: wp(4),
    paddingRight: wp(10),
    height: hp(5),
    borderWidth: wp(0.1),
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    color: "#000",
  },
  clearButton: {
    position: "absolute",
    right: wp(2.5),
    padding: wp(1),
    zIndex: 1,
  },
  clearIcon: {
    width: wp(4),
    height: wp(4),
  },
  sectionContainer: {
    marginTop: hp(2),
    marginBottom: hp(3),
    paddingHorizontal: wp(3),
  },
  container: {
    flex: 1,
    paddingTop: hp(5),
    paddingHorizontal: wp(2),
  },
  scrollView: {
    paddingVertical: hp(0.5),
    marginVertical: hp(1),
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(1),
    borderWidth: 1,
    borderRadius: wp(5),
    borderColor: COLORS.gray,
    paddingVertical: 8,
    paddingHorizontal: 15,
    height: hp(4.5),
  },
  selectedCard: {
    borderColor: COLORS.primary,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  icon: {
    marginRight: 8,
  },
  errorText: {
    color: COLORS.red,
    textAlign: "center",
    marginTop: hp(1),
    fontSize: wp(3.5),
  },
  
  // Updated styles for proper layout with TypeTabs
  contentContainer: {
    flex: 1,
    paddingBottom: hp(2),
    marginTop: hp(3), // Increased top margin to accommodate TypeTabs
  },
  resultContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  emptyIcon: {
    marginBottom: hp(2),
    opacity: 0.5,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  welcomeIcon: {
    marginBottom: hp(2),
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: wp(4.5),
    color: COLORS.gray,
    marginHorizontal: wp(10),
    lineHeight: wp(6),
  },
  
  // Skeleton loader styles
  skeletonContainer: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingTop: hp(2),
  },
  skeletonItem: {
    flexDirection: 'row',
    marginBottom: hp(2),
    padding: wp(3),
    backgroundColor: COLORS.lightGray || '#f5f5f5',
    borderRadius: wp(2),
  },
  skeletonImage: {
    width: wp(20),
    height: wp(20),
    backgroundColor: COLORS.gray,
    marginRight: wp(3),
    borderRadius: wp(2),
    opacity: 0.3,
  },
  skeletonContent: {
    flex: 1,
    justifyContent: 'center',
  },
  skeletonTitle: {
    width: wp(60),
    height: hp(2.5),
    backgroundColor: COLORS.gray,
    marginBottom: hp(1),
    borderRadius: wp(1),
    opacity: 0.3,
  },
  skeletonText: {
    width: wp(40),
    height: hp(1.8),
    backgroundColor: COLORS.gray,
    marginBottom: hp(0.8),
    borderRadius: wp(1),
    opacity: 0.3,
  },
});