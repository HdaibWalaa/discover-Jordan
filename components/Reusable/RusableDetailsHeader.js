import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GoBack from "../Buttons/GoBack";

const RusableDetailsHeader = ({ isCreator }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.iconButton}>
            <GoBack />
          </View>
          <View style={styles.iconContainer}>
            {isCreator && (
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="hand-wave"
                  size={24}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: hp(7),
    paddingHorizontal: wp(4),
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    padding: hp(1),
    marginHorizontal: wp(1),
    backgroundColor: COLORS.white,
    borderRadius: hp(2),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RusableDetailsHeader;
