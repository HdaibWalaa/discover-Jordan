import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { COLORS, SIZES,TEXT } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";
import ReusableText from "../Reusable/ReusableText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReusableBtn from "../Buttons/ReusableBtn";

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

        console.log("Fetched Tags:", response.data.data); // Log fetched tags
        setTags(response.data.data); // Update state with tags
      } catch (error) {
        Alert.alert("Error", "Failed to fetch tags. Please try again later.");
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [authCtx.token]);

  const handleTagPress = (tagId) => {
    // Update selected tags
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    console.log("Updated Selected Tags:", newTags); // Log updated tags
    onTagsChange(newTags);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ReusableText
          text={"Tags Options: Make Your Choices"}
          family={"Bold"}
          size={TEXT.medium}
          color={COLORS.black}
          align={"left"}
        />
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>2/2</Text>
        </View>
      </View>
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
    color: COLORS.black,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  tagButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 2,
    backgroundColor: COLORS.lightGray,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.black, // Default black border for inactive
  },
  selectedTagButton: {
    borderColor: COLORS.primary, // Colored border for active tag
  },
  tagImage: {
    width: 40,
    height: 40,
    marginRight: 10, // Space between image and text
  },
  tagText: {
    color: COLORS.black,
    fontSize: SIZES.body4,
  },
  selectedTagText: {
    color: COLORS.primary, // Change text color when selected
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp("5%"),
    width: wp(64),
    left: hp("2%"),
    top: wp(3),
  },
  stepIndicator: {
    backgroundColor: COLORS.black,
    borderRadius: wp("12.5%"),
    width: wp("12.5%"),
    height: wp("12.5%"),
    alignItems: "center",
    justifyContent: "center",
    left: hp("4%"),
  },
  stepText: {
    color: COLORS.white,
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
});
