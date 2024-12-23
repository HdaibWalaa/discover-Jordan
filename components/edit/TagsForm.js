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

const TagsForm = ({ selectedTags, setSelectedTags, handleSubmit }) => {
  return (
    <View>
      <ScrollView
        style={styles.tagScrollView}
        contentContainerStyle={styles.tagScrollContent}
      >
        <TagSelector
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TagsForm;

const styles = StyleSheet.create({
  tagScrollView: {
    maxHeight: 200, // Adjust to your needs
  },
  tagScrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
