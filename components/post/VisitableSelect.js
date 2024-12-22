import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import styles from "./post.style"; // Ensure this path is correct
import BASE_URL from "../../hook/apiConfig";

const VisitableSelect = ({ visitableType, setVisitableId }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (visitableType) {
      fetchItems();
    }
  }, [visitableType]);

  const fetchItems = async () => {
    setLoading(true);
    let url = ""; // Replace with your actual base URL

    // Set the API endpoint based on the selected type
    switch (visitableType) {
      case "Trip":
        url = `${BASE_URL}/all/trip/search`;
        break;
      case "Place":
        url = `${BASE_URL}/all/places/search`;
        break;
      case "Plan":
        url = `${BASE_URL}/all/plan/search`;
        break;
      case "Event":
        url = `${BASE_URL}/all/event/search`;
        break;
      case "Volunteering":
        url = `${BASE_URL}/all/volunteering/search`;
        break;
      default:
        break;
    }

    try {
      const response = await axios.get(url);
      setItems(response.data); // Assuming the response contains an array of items
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setVisitableId(item.id); // Pass the selected item's ID back to parent
  };

  return (
    <View style={styles.inputContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedItem?.id === item.id && styles.selectedOption,
              ]}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={styles.optionText}>{item.name || item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default VisitableSelect;
