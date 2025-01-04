import { ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import styles from "./home.style";
import { RusableWhite, ReusableText, HeightSpacer } from "../../components";
import Trips from "../../components/Home/Trips";
import Categories from "../../components/Home/Categories";
import Event from "../../components/Home/Event";
import Volunteer from "../../components/Home/Volunteer";
import Plans from "../../components/Home/Plans";
import TopTen from "../../components/Home/TopTen";
import Popular from "../../components/Home/Popular";
import Guides from "../../components/Home/Guides";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

const Home = ({ navigation }) => {
  return (
    <RusableWhite>
      <SafeAreaView style={reusable.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ gap: 30 }}>
            <Categories />
            <TopTen />
            <Trips />
            <Guides />
            <Plans />
            <Popular />
            <Event />
            <Volunteer />
            <HeightSpacer height={50} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </RusableWhite>
  );
};

export default Home;
