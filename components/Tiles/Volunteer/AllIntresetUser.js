import React from "react";
import { Text, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../../constants/theme";

const AllIntresetUser = ({ users = [], interested_users }) => {
  const displayedUsers = users.slice(0, 3);
  const remainingUsersCount = interested_users - displayedUsers.length;

  return (
    <View style={styles.container}>
      <View style={styles.usersContainer}>
        {displayedUsers.map((user, index) => (
          <Image
            key={index}
            source={
              user.image
                ? { uri: user.image }
                : require("../../../assets/images/icons/guestProfile.png")
            }
            style={styles.userImage}
          />
        ))}
      </View>
      {users.length === 0 ? (
        <Text style={styles.noUsersText}>No users intrsted yet</Text>
      ) : remainingUsersCount > 0 ? (
        <View style={styles.remainingUsersContainer}>
          <Text style={styles.remainingUsersCountText}>
            +{remainingUsersCount}
          </Text>
          <Text style={styles.remainingUsersText}> intrsted users</Text>
        </View>
      ) : (
        <Text style={styles.remainingUsersText}>intrsted users</Text>
      )}
    </View>
  );
};

export default AllIntresetUser;

const styles = {
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  usersContainer: {
    flexDirection: "row",
    marginRight: wp(3),
  },
  userImage: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(5),
    marginRight: wp(-2),
  },
  remainingUsersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  remainingUsersCountText: {
    color: COLORS.secondary,
    fontSize: wp(4),
    fontFamily: "Medium",
    marginLeft: wp(1),
  },
  remainingUsersText: {
    color: COLORS.secondary,
    fontSize: wp(4),
    fontFamily: "Medium",
    marginLeft: wp(1),
  },
  noUsersText: {
    color: COLORS.secondary,
    fontSize: wp(4),
    fontFamily: "Medium",
  },
};
