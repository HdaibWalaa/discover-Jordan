import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VirtualizedList } from "react-native";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { ReusableBackground, ReusableShuffle } from "../../components";
import AllPost from "../../components/post/AllPost";

const Following = () => {
  const postData = [];

  return (
    <ReusableBackground>
      <SafeAreaView style={reusable.container}>
        <View>
          <View style={[reusable.header1, { marginTop: 30 }]}>
            <View style={{ width: 200 }}>
              <ReusableText
                text={"Followed users activities and posts"}
                family={"Bold"}
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>
            <ReusableShuffle />
          </View>
          <AllPost />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default Following;
