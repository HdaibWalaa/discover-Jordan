import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import BASE_URL from "../../hook/apiConfig";

const SelectVolunteering = ({ label, onValueChange, value }) => {
  const [selectedVolunteering, setSelectedVolunteering] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const [volunteerings, setVolunteerings] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVolunteerings = async (query, page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all/volunteering/search`, {
        params: { query, page },
      });
      if (response.status === 200 && response.data?.data.volunteerings) {
        setVolunteerings((prev) =>
          page === 1
            ? response.data.data.volunteerings
            : [...prev, ...response.data.data.volunteerings]
        );
      } else {
        setVolunteerings([]);
      }
    } catch (error) {
      console.error("Error fetching volunteerings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteerings(searchQuery);
  }, [searchQuery]);

  const handleValueChange = (volunteering) => {
    setSelectedVolunteering(volunteering.name);
    setSearchQuery(volunteering.name);
    if (onValueChange) onValueChange(volunteering.id);
  };

  return (
    <View>
      <ReusableText
        text={label}
        family={"Regular"}
        size={TEXT.medium}
        color={COLORS.dark}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
        }}
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder="Search for volunteering..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {volunteerings.length > 0 && (
        <FlatList
          data={volunteerings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleValueChange(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SelectVolunteering;
