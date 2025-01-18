import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, TEXT } from "../../constants/theme";
import { RusableWhite } from "../../components";
import CreateTripForm from "../../components/trip/CreatTripForm";

const CreateTrip = () => {
  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <RusableWhite>
      <SafeAreaView style={[reusable.container]}>
        <View>
          <View style={reusable.header1}>
            <View style={{ width: 300, top: -30 }}>
              <ReusableText
                text={capitalize("Create Your Trip")}
                family={"Bold"}
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <CreateTripForm />
        </ScrollView>
      </SafeAreaView>
    </RusableWhite>
  );
};

export default CreateTrip;
