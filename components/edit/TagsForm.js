import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import TagSelector from "../Profile/TagSelector";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReusableBtn from "../Buttons/ReusableBtn";

const TagsForm = ({ allTags, selectedTags, setSelectedTags, handleSubmit }) => {
  return (
    <View>
      <ScrollView>
        <TagSelector
          allTags={allTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
      </ScrollView>
      <ReusableBtn
        btnText="DONE"
        backgroundColor={COLORS.primary}
        textColor={COLORS.black}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default TagsForm;


const styles = StyleSheet.create({
  tagScrollView: {
    maxHeight: 300, // Adjust to your needs
  },
  tagScrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    height: hp("55%"),
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
