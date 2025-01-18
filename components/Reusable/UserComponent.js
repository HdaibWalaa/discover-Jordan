import React from "react";
import { Text, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

const UserComponent = ({ users = [], attendanceNumber }) => {
  const displayedUsers = users.slice(0, 3);
  const remainingUsersCount = attendanceNumber - displayedUsers.length;

  return (
    <View style={styles.container}>
      <View style={styles.usersContainer}>
        {displayedUsers.map((user, index) => (
          <Image
            key={index}
            source={
              user.image
                ? { uri: user.image }
                : require("../../assets/images/icons/guestProfile.png")
            }
            style={styles.userImage}
          />
        ))}
      </View>
      {users.length === 0 ? (
        <Text style={styles.noUsersText}>No users going yet</Text>
      ) : remainingUsersCount > 0 ? (
        <View style={styles.remainingUsersContainer}>
          <Text style={styles.remainingUsersCountText}>
            +{remainingUsersCount}
          </Text>
          <Text style={styles.remainingUsersText}> Going</Text>
        </View>
      ) : (
        <Text style={styles.remainingUsersText}>Going</Text>
      )}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  usersContainer: {
    flexDirection: "row",
    marginRight: wp(3),
  },
  userImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(-3),
  },
  remainingUsersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  remainingUsersCountText: {
    color: COLORS.secondary,
    fontSize: wp(5),
    fontFamily: "Medium",
    marginLeft: wp(1),
  },
  remainingUsersText: {
    color: COLORS.secondary,
    fontSize: wp(5),
    fontFamily: "Medium",
    marginLeft: wp(1),
  },
  noUsersText: {
    color: COLORS.secondary,
    fontSize: wp(5),
    fontFamily: "Medium",
  },
};

export default UserComponent;
