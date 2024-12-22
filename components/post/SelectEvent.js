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

const SelectEvent = ({ label, onValueChange, value }) => {
  const [selectedEvent, setSelectedEvent] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async (query, page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all/event/search`, {
        params: { query, page },
      });
      if (response.status === 200 && response.data?.data.events) {
        setEvents((prev) =>
          page === 1
            ? response.data.data.events
            : [...prev, ...response.data.data.events]
        );
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(searchQuery);
  }, [searchQuery]);

  const handleValueChange = (event) => {
    setSelectedEvent(event.name);
    setSearchQuery(event.name);
    if (onValueChange) onValueChange(event.id);
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
          placeholder="Search for an event..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {events.length > 0 && (
        <FlatList
          data={events}
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

export default SelectEvent;
