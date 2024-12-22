import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { TEXT, COLORS } from "../../../constants/theme";
import { NetworkImage, ReusableText } from "../../../components/index";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const TopTenCard = ({ item, isActive }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlaceDetails", { id: item.place_id })}
      style={[styles.container, isActive ? styles.active : styles.inactive]}
    >
      <View>
        <NetworkImage
          source={item.image}
          width={wp(80)}
          height={wp(70)}
          radius={12}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <View style={styles.overlayContainer}>
          <ReusableText
            text={item.name.toUpperCase()}
            family={"Bold"}
            size={TEXT.medium}
            color={COLORS.white}
            align={"left"}
          />
          <ReusableText
            text={item.description.slice(0, 100) + "..."}
            family={"Bold"}
            size={TEXT.xxSmall}
            color={COLORS.white}
            align={"left"}
          />
          <TouchableOpacity style={styles.readMoreButton}>
            <View style={styles.readMoreContainer}>
              <ReusableText
                text={"Read More"}
                family={"Bold"}
                size={TEXT.xxSmall}
                color={COLORS.white}
                align={"left"}
              />
              <Feather name="arrow-up-right" size={15} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopTenCard;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    marginHorizontal: 10, 
    },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderRadius: 12,
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
    flexDirection: "column",
    alignItems: "flex-start",
  },
  readMoreContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  active: {
    transform: [{ scale: 1.1 }],
  },
  inactive: {
    transform: [{ scale: 1 }],
  },
});
