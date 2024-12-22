import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CreatePostForm from "../../components/post/CreatPstForm";
import { ReusableBackground, RusableWhite } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

const CreatePostScreen = ({ navigation }) => {
  return (
    <RusableWhite>
      <SafeAreaView style={reusable.container}>
        <View style={{ gap: 30 }}>
          <View style={reusable.header1}>
            <View style={{ width: 350 }}>
              <ReusableText
                text={"Compose a post about a trip or Plan you recently took."}
                family={"Bold"}
                size={TEXT.xLarge}
                color={COLORS.black}
              />
            </View>
          </View>
          <View>
            <CreatePostForm navigation={navigation} />
          </View>
        </View>
      </SafeAreaView>
    </RusableWhite>
  );
};

export default CreatePostScreen;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
