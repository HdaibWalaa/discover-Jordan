import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SIZES, COLORS, TEXT } from "../../constants/theme";
import GoBack from "../Buttons/GoBack";
import ReusableText from "../Reusable/ReusableText";
import ReusableRegionLocation from "../Reusable/ReusableRegionLocation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const DetailsHeader = ({
  tripDetails,
  isCreator,
  onEdit,
  onDelete,
  // new props from parent
  onHandPress,
  onLeaveTrip,
  isUserJoined,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.TopHeader}>
        <GoBack style={styles.goBack} />
        <View style={styles.rightButtonsContainer}>
          {isCreator ? (
            <>
              {/*
                Creator sees the More Menu and the Requests (Hand) button.
              */}
              <Menu>
                <MenuTrigger customStyles={triggerStyles}>
                  <Image
                    source={require("../../assets/images/icons/more.png")}
                    style={styles.moreIcon}
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={onEdit}>
                    <Text style={styles.menuText}>Edit</Text>
                  </MenuOption>
                  <MenuOption onSelect={onDelete}>
                    <Text style={styles.menuText}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>

              <TouchableOpacity style={styles.handButton} onPress={onHandPress}>
                <Image
                  source={require("../../assets/images/icons/hand.png")}
                  style={styles.handIcon}
                />
              </TouchableOpacity>
            </>
          ) : (
            // Non-Creator: If user is joined, show "Leave Trip" button
            isUserJoined && (
              <TouchableOpacity
                style={styles.leaveButton}
                onPress={onLeaveTrip}
              >
                <Text style={styles.leaveButtonText}>Leave Trip</Text>
              </TouchableOpacity>
            )
          )}

          {/* Everyone sees the Favorite button (if you want) */}
          <TouchableOpacity style={styles.favoriteButton}>
            <Image
              source={require("../../assets/images/icons/heart.png")}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ButtomHeader}>
        <ReusableText
          text={tripDetails.name.toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.dark}
          style={styles.titleText}
        />
        <ReusableRegionLocation region={tripDetails.region} />
      </View>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("5%"),
    paddingHorizontal: wp("5%"),
  },
  TopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
  },
  rightButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginRight: wp("-5%"),
  },
  goBack: {
    padding: wp("1.5%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
  },
  favoriteButton: {
    padding: wp("2%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    marginLeft: wp("2%"),
  },
  handButton: {
    padding: wp("2%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    marginLeft: wp("2%"),
  },
  moreButton: {
    padding: wp("2%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    marginLeft: wp("2%"),
  },
  heartIcon: {
    width: wp("5%"),
    height: hp("2%"),
  },
  handIcon: {
    width: wp("5%"),
    height: hp("2%"),
  },
  moreIcon: {
    width: wp("5%"),
    height: hp("2%"),
  },
  leaveButton: {
    padding: wp("2%"),
    backgroundColor: "red",
    borderRadius: wp("3%"),
    marginLeft: wp("2%"),
  },
  leaveButtonText: {
    color: "#fff",
    fontSize: SIZES.small,
  },
  ButtomHeader: {
    alignItems: "center",
    marginBottom: hp("2%"),
    top: hp(-2),
  },
  titleText: {
    textAlign: "center",
  },
  locationText: {
    marginTop: hp("1%"),
  },
  menuText: {
    padding: 10,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
});

const triggerStyles = {
  triggerTouchable: {
    style: {
      padding: wp("2%"),
      borderColor: COLORS.dark,
      borderRadius: wp("3%"),
      borderWidth: 1,
      marginLeft: wp("2%"),
    },
  },
};
