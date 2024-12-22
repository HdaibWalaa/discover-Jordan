import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { TEXT, COLORS } from "../../../constants/theme";
import { NetworkImage, ReusableText, ReusableGo } from "../../index";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AllCategory = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlacesList", { id: item.id })}
    >
      <View style={styles.container}>
        <NetworkImage
          source={item.image}
          width={wp(42)}
          height={wp(42)}
          radius={12}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <View style={styles.overlayContainer}>
          <View style={styles.textContainer}>
            <ReusableText
              text={item.name}
              family={"Bold"}
              size={TEXT.medium}
              color={COLORS.white}
              align={"left"}
            />
            <View style={styles.goContainer}>
              <ReusableGo
                onPress={() =>
                  navigation.navigate("PlacesList", { id: item.id })
                }
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: wp(42),
    height: wp(42),
    borderRadius: 12,
    overflow: "hidden",
    marginTop: hp("2%"),
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 0,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default AllCategory;
