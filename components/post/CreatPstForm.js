import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../../hook/PostApi";
import { AuthContext } from "../../store/auth-context";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import styles from "./post.style";
import VisitableType from "./VisitableType";
import PostPrivacy from "./PostPrivacy";
import HeightSpacer from "../Reusable/HeightSpacer";
import { COLORS } from "../../constants/theme";
import SelectPlace from "../trip/SelcetPlace";
import SelectEvent from "./SelectEvent";
import SelectPlan from "./SelectPlan";
import SelectTrip from "./SelectTrip";
import SelectVolunteering from "./SelectVolunteering";

const CreatePostForm = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [privacy, setPrivacy] = useState(1);
  const [visitableType, setVisitableType] = useState("Trip");
  const [visitableId, setVisitableId] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  // Pick media (images or videos)
  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedMedia = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.type,
      }));
      setMedia((prevMedia) => [...prevMedia, ...selectedMedia]);
    }
  };

  const handleCreatePost = async () => {
    if (!visitableId || !content.trim()) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createPost(
        token,
        visitableType.toLowerCase(),
        visitableId,
        content,
        media,
        privacy
      );

      if (response.status === 200) {
        setIsAlertVisible(true); // Show Fancy Alert

        // Automatically navigate to Following screen after 2 seconds
        setTimeout(() => {
          setIsAlertVisible(false);
          navigation.navigate("Following");
        }, 2000);
      } else {
        Alert.alert("Error", "Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "An error occurred while creating the post.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderVisitableSelect = () => {
    switch (visitableType) {
      case "Place":
        return (
          <SelectPlace onValueChange={setVisitableId} value={visitableId} />
        );
      case "Trip":
        return (
          <SelectTrip onValueChange={setVisitableId} value={visitableId} />
        );
      case "Plan":
        return (
          <SelectPlan onValueChange={setVisitableId} value={visitableId} />
        );
      case "Event":
        return (
          <SelectEvent onValueChange={setVisitableId} value={visitableId} />
        );
      case "Volunteering":
        return (
          <SelectVolunteering
            onValueChange={setVisitableId}
            value={visitableId}
          />
        );
      default:
        return null;
    }
  };

  const formSections = [
    {
      id: "1",
      component: (
        <VisitableType
          visitableType={visitableType}
          setVisitableType={setVisitableType}
        />
      ),
    },
    { id: "2", component: renderVisitableSelect() },
    {
      id: "3",
      component: (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here ..."
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
      ),
    },
    {
      id: "4",
      component: <PostPrivacy privacy={privacy} setPrivacy={setPrivacy} />,
    },
    {
      id: "5",
      component: (
        <TouchableOpacity style={styles.pickMediaButton} onPress={pickMedia}>
          <Text style={styles.pickMediaText}>Pick Media</Text>
        </TouchableOpacity>
      ),
    },
    {
      id: "6",
      component: (
        <View style={styles.mediaPreviewContainer}>
          {media.map((file, index) => (
            <View key={index} style={styles.mediaWrapper}>
              {file.type === "image" ? (
                <Image source={{ uri: file.uri }} style={styles.mediaPreview} />
              ) : (
                <Text style={styles.videoPreviewText}>[Video Selected]</Text>
              )}
            </View>
          ))}
        </View>
      ),
    },
    {
      id: "7",
      component: (
        <TouchableOpacity
          style={[styles.postButton, isLoading && styles.disabledButton]}
          onPress={handleCreatePost}
          disabled={isLoading}
        >
          <Text style={styles.postButtonText}>
            {isLoading ? "Posting..." : "POST"}
          </Text>
        </TouchableOpacity>
      ),
    },
    { id: "8", component: <HeightSpacer height={50} /> },
  ];

  return (
    <View>
      <FlatList
        data={formSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View>{item.component}</View>}
      />
      {/* Fancy Alert */}
      <FancyAlert
        visible={isAlertVisible}
        icon={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>🎉</Text>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text
          style={{
            marginTop: -16,
            marginBottom: 32,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Post created successfully!
        </Text>
      </FancyAlert>
    </View>
  );
};

export default CreatePostForm;
