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
import styles from "./post.style";
import VisitableType from "./VisitableType";
import PostMedia from "./PostMedia";
import PostPrivacy from "./PostPrivacy";
import HeightSpacer from "../Reusable/HeightSpacer";
import Modal from "react-native-modal";
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { token } = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.canceled) {
      setMedia(result.assets.map((asset) => asset.uri));
    }
  };

  const handleCreatePost = async () => {
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
        setModalMessage(response.msg || "Post created successfully!");
        setModalVisible(true);
      } else {
        console.error("Failed to create post:", response.msg);
        setModalMessage("Failed to create post.");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setModalMessage("An error occurred while creating the post.");
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const renderVisitableSelect = () => {
    switch (visitableType) {
      case "Place":
        return (
           <SelectPlace
            label="Place Name"
            iconSource={require("../../assets/images/icons/place.png")}
            iconSource2={require("../../assets/images/icons/Iconly.png")}
            onValueChange={setVisitableId} value={visitableId}
            width={350}
          />
        );
      case "Trip":
        return (
          <SelectTrip
            label="Trip Name"
            iconSource={require("../../assets/images/icons/place.png")}
            iconSource2={require("../../assets/images/icons/Iconly.png")}
            onValueChange={setVisitableId}
            value={visitableId}
            width={350}
          />
        );
      case "Plan":
        return (
          <SelectPlan  label="Plan Name"
            iconSource={require("../../assets/images/icons/place.png")}
            iconSource2={require("../../assets/images/icons/Iconly.png")}
            onValueChange={setVisitableId} value={visitableId}
            width={350} />
        );
      case "Event":
        return (
          <SelectEvent  label="Event Name"
            iconSource={require("../../assets/images/icons/place.png")}
            iconSource2={require("../../assets/images/icons/Iconly.png")}
            onValueChange={setVisitableId} value={visitableId}
            width={350} />
        );
      case "Volunteering":
        return (
          <SelectVolunteering
            label="Volunteer Name"
            iconSource={require("../../assets/images/icons/place.png")}
            iconSource2={require("../../assets/images/icons/Iconly.png")}
            onValueChange={setVisitableId}
            value={visitableId}
            width={350}
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
    { id: "5", component: <PostMedia pickImage={pickImage} /> },
    {
      id: "6",
      component: (
        <View style={styles.mediaPreviewContainer}>
          {media.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.mediaPreview} />
          ))}
        </View>
      ),
    },
    {
      id: "7",
      component: (
        <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
          <Text style={styles.postButtonText}>POST</Text>
        </TouchableOpacity>
      ),
    },
    { id: "8", component: <HeightSpacer height={50} /> },
  ];

  return (
    <FlatList
      data={formSections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View>{item.component}</View>}
    />
  );
};

export default CreatePostForm;
