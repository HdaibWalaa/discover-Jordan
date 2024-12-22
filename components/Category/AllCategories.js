import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ReusableText, ReusableGo, NetworkImage } from "../index";
import { SIZES, COLORS, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AllCategories = ({ categories }) => {
  const navigation = useNavigation();

  if (!categories || categories.length === 0) {
    return <ReusableText text={"No categories available"} family={"Bold"} />;
  }

  // Function to format the categories array into pairs for two-column layout
  const formatCategories = (categories) => {
    const formatted = [];
    for (let i = 0; i < categories.length; i += 2) {
      formatted.push([categories[i], categories[i + 1]]);
    }
    return formatted;
  };

  return (
    <FlatList
      data={formatCategories(categories)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.row}>
          {item[0] && (
            <TouchableOpacity
              style={styles.categoryContainer}
              onPress={() =>
                navigation.navigate("PlacesList", { id: item[0].id })
              }
            >
              <NetworkImage
                source={item[0].image}
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
                    text={item[0].name}
                    family={"Bold"}
                    size={TEXT.medium}
                    color={COLORS.white}
                    align={"left"}
                  />
                  <ReusableGo
                    onPress={() =>
                      navigation.navigate("PlacesList", { id: item[0].id })
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {item[1] && (
            <TouchableOpacity
              style={styles.categoryContainer}
              onPress={() =>
                navigation.navigate("PlacesList", { id: item[1].id })
              }
            >
              <NetworkImage
                source={item[1].image}
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
                    text={item[1].name}
                    family={"Bold"}
                    size={TEXT.medium}
                    color={COLORS.white}
                    align={"left"}
                  />
                  <ReusableGo
                    onPress={() =>
                      navigation.navigate("PlacesList", { id: item[1].id })
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      ListFooterComponent={<View style={{ height: 200 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryContainer: {
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

export default AllCategories;
