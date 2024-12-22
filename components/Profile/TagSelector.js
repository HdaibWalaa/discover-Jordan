import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios"; // Ensure axios is imported
import { COLORS, SIZES } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";

const TagSelector = ({ selectedTags, onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/all/tags`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            Accept: "application/json",
          },
        });
        setTags(response.data.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch tags. Please try again later.");
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [authCtx.token]);

  const handleTagPress = (tagName) => {
    const newTags = selectedTags.includes(tagName)
      ? selectedTags.filter((name) => name !== tagName)
      : [...selectedTags, tagName];

    onTagsChange(newTags);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tags</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tagButton,
              selectedTags.includes(tag.id) && styles.selectedTagButton,
            ]}
            onPress={() => handleTagPress(tag.id)}
          >
            <Image
              source={{
                uri: selectedTags.includes(tag.id)
                  ? tag.image_active
                  : tag.image_inactive,
              }}
              style={styles.tagImage}
            />
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(tag.id) && styles.selectedTagText,
              ]}
            >
              {tag.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TagSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: SIZES.body3,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagButton: {
    padding: 10,
    margin: 5,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    alignItems: "center",
  },
  selectedTagButton: {
    backgroundColor: COLORS.primary,
  },
  tagImage: {
    width: 50,
    height: 50,
  },
  tagText: {
    color: COLORS.black,
    fontSize: SIZES.body3,
    textAlign: "center",
  },
  selectedTagText: {
    color: COLORS.white,
  },
});
