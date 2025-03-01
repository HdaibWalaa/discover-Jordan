import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";
import BASE_URL from "../../../hook/apiConfig";
import { useLanguage } from "../../../store/context/LanguageContext";
import translations from "../../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TagOption = ({ label, isSelected, onPress, image }) => {
  return (
    <TouchableOpacity
      style={[styles.tagOption, isSelected && styles.selectedTag]}
      onPress={onPress}
    >
      <Image source={{ uri: image }} style={styles.tagImage} />
      <Text style={styles.tagText}>{label}</Text>
    </TouchableOpacity>
  );
};

const SelectEditTags = ({ label, onValueChange, value = [] }) => {
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];

  const [selectedTags, setSelectedTags] = useState(value);
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trip/tags`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
        });
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setTags(response.data.data);
        } else {
          console.error("Failed to fetch tags:", response.statusText);
          setTags([]);
        }
      } catch (error) {
        console.error("Error fetching tags:", error.message);
        setTags([]);
      }
    };

    fetchTags();
  }, [token, language]);

  // New useEffect to handle error state when selectedTags changes
  useEffect(() => {
    if (selectedTags.length < 3) {
      setTagsError(localizedText.selectAtLeastThreeTags);
    } else {
      setTagsError("");
    }
  }, [selectedTags, localizedText.selectAtLeastThreeTags]);

  const handleTagPress = (id) => {
    let updatedSelectedTags;
    if (selectedTags.includes(id)) {
      updatedSelectedTags = selectedTags.filter((tagId) => tagId !== id);
    } else {
      updatedSelectedTags = [...selectedTags, id];
    }
    setSelectedTags(updatedSelectedTags);

    if (onValueChange) {
      onValueChange(updatedSelectedTags);
    }
  };

  useEffect(() => {
    setSelectedTags(value);
  }, [value]);

  return (
    <View style={styles.container}>
      {label && (
        <ReusableText
          text={label}
          family={"Regular"}
          size={TEXT.medium}
          color={COLORS.dark}
        />
      )}
      <View style={styles.tagsContainer}>
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagOption
              key={tag.id}
              label={tag.name}
              isSelected={selectedTags.includes(tag.id)}
              onPress={() => handleTagPress(tag.id)}
              image={
                selectedTags.includes(tag.id)
                  ? tag.image_active
                  : tag.image_inactive
              }
            />
          ))
        ) : (
          <Text style={styles.noTagsText}>{localizedText.noTagsAvailable}</Text>
        )}
      </View>
      {tagsError ? <Text style={styles.errorText}>{tagsError}</Text> : null}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: hp(1),
  },
  tagOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: wp(8),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    margin: wp(1),
    backgroundColor: COLORS.white,
  },
  selectedTag: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tagText: {
    color: COLORS.black,
    marginLeft: wp(2),
    fontSize: wp(3.5),
  },
  tagImage: {
    width: wp(7),
    height: wp(7),
    resizeMode: "contain",
  },
  errorText: {
    color: COLORS.red,
    marginTop: hp(0.5),
    fontSize: wp(3.5),
  },
  noTagsText: {
    fontSize: wp(4),
    color: COLORS.gray,
  },
});

export default SelectEditTags;
