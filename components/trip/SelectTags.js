import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";

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

const SelectTags = ({ label, onValueChange, value = [] }) => {
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
            "Content-Language": "en",
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
  }, [token]);

  const handleTagPress = (id) => {
    let updatedSelectedTags;
    if (selectedTags.includes(id)) {
      updatedSelectedTags = selectedTags.filter((tagId) => tagId !== id);
    } else {
      updatedSelectedTags = [...selectedTags, id];
    }
    setSelectedTags(updatedSelectedTags);
    if (updatedSelectedTags.length < 3) {
      setTagsError("Please select at least three tags.");
    } else {
      setTagsError("");
    }
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
          color={COLORS.dark} // Set label color to COLORS.dark
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
          <Text>No tags available.</Text>
        )}
      </View>
      {tagsError ? <Text style={styles.errorText}>{tagsError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tagOption: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  selectedTag: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tagText: {
    color: COLORS.black,
    marginTop: 5,
  },
  tagImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  errorText: {
    color: COLORS.red,
    marginTop: 5,
    fontSize: 14,
  },
});

export default SelectTags;
