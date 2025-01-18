import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { COLORS } from "../../constants/theme";

const CreatActivityForm = ({ value, onChangeText, onAddActivity }) => {
  const [activity, setActivity] = useState({
    name: "",
    start_time: "",
    end_time: "",
    place_id: "",
    note: "",
  });

  const handleChange = (name, value) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    onAddActivity(activity);
    setActivity({
      name: "",
      start_time: "",
      end_time: "",
      place_id: "",
      note: "",
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Activity Name"
        value={activity.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time"
        value={activity.start_time}
        onChangeText={(text) => handleChange("start_time", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        value={activity.end_time}
        onChangeText={(text) => handleChange("end_time", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Place ID"
        value={activity.place_id}
        onChangeText={(text) => handleChange("place_id", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={activity.note}
        onChangeText={(text) => handleChange("note", text)}
      />
      <Button title="Add Activity" onPress={handleAddActivity} />
    </View>
  );
};

export default CreatActivityForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginBottom: 10,
    padding: 8,
  },
});
