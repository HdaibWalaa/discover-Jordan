import React from "react";
import { SafeAreaView, View } from "react-native";
import reusable from "../../components/Reusable/reusable.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  ReusableText,
  HeightSpacer,
  ReusableBackground,
} from "../../components";
import AllTopTenPLaces from "../../components/places/AllTopTenPLaces";
import { useNavigation } from "@react-navigation/native";

const AllTopTen = () => {
  const navigation = useNavigation();

  return (
    <ReusableBackground>
      <SafeAreaView style={[reusable.container, { marginTop: 50 }]}>
        <View>
          <View style={reusable.header1}>
            <View>
              <ReusableText
                text={"Top 10 Places In Jordan"}
                family={"SemiBold"}
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>
          </View>
          <AllTopTenPLaces />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllTopTen;
