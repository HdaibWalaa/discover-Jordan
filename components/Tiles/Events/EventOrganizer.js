import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const EventOrganizer = ({ organizers }) => {
  return (
    <View>
      <FlatList
        data={organizers}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.organizerContainer}>
            <Image source={{ uri: item.image }} style={styles.organizerImage} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.organizersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  organizersList: {
    paddingVertical: SIZES.medium,
  },
  organizerContainer: {
    alignItems: "center",
    marginRight: SIZES.medium,
  },
  organizerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray,
  },
  organizerText: {
    marginTop: SIZES.small,
    color: COLORS.black,
    fontSize: SIZES.small,
    textAlign: "center",
  },
});

export default EventOrganizer;
