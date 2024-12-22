import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  FlatList,
} from "react-native";
import { GoBack } from "../index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ChatHeader = ({ tripName, avatar, users }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../../assets/images/header1.png")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.TopHeader}>
            <GoBack style={styles.goBack} />
            <Text style={styles.tripName}>{tripName}</Text>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>
          <View style={styles.BottomHeader}>
            <FlatList
              data={users}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.userContainer}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.userAvatar}
                  />
                  <Text style={styles.userName}>{item.name}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerWrapper: {
    borderBottomLeftRadius: hp(4),
    borderBottomRightRadius: hp(4),
    overflow: "hidden",
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: hp(30), // Adjust height as needed
  },
  TopHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensure even spacing between elements
    alignItems: "center", // Align items vertically centered
    paddingHorizontal: wp(6),
    paddingTop: hp(7),
  },
  goBack: {
    padding: wp(2),
    borderColor: "#000",
    borderRadius: wp(3),
    borderWidth: 1,
  },
  tripName: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    flex: 1, // Allows the trip name to take up the remaining space between the back button and avatar
    textAlign: "center", // Center the text within its available space
  },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
  },
  BottomHeader: {
    marginTop: hp(2),
    paddingHorizontal: wp(6),
  },
  userContainer: {
    alignItems: "center",
    marginRight: wp(4),
  },
  userAvatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
  },
  userName: {
    marginTop: hp(1),
    fontSize: 14,
    color: "#000",
  },
});
