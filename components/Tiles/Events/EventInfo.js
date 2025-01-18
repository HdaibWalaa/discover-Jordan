import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const EventInfo = ({ time, date, capacity, price }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Image
          source={require("../../../assets/images/icons/clock.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <ReusableText
          text={time}
          family={"Medium"}
          size={wp("3.5%")}
          color={COLORS.gray}
          align={"left"}
        />
      </View>

      <View style={styles.infoRow}>
        <Image
          source={require("../../../assets/images/icons/calendar.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <ReusableText
          text={date}
          family={"Medium"}
          size={wp("3.5%")}
          color={COLORS.gray}
          align={"left"}
        />
      </View>

      <View style={styles.infoRow}>
        <Image
          source={require("../../../assets/images/icons/capacity.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <ReusableText
          text={`Max capacity: ${capacity} Persons`}
          family={"Medium"}
          size={wp("3.5%")}
          color={COLORS.gray}
          align={"left"}
        />
      </View>

      <View style={styles.infoRow}>
        <Image
          source={require("../../../assets/images/icons/wallet.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <ReusableText
          text={price ? `${price} JOD` : "Free"}
          family={"Medium"}
          size={wp("3.5%")}
          color={COLORS.gray}
          align={"left"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: SIZES.medium,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  icon: {
    width: 20, 
    height: 20,
    marginRight: SIZES.small,
  },
});

export default EventInfo;
