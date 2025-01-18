import { StyleSheet, Text, View } from "react-native";
import React from "react";

import CreatForm from "../../components/Guide/CreatForm/CreatForm";

const CreateGuideTrip = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Guide Trip</Text>
      <CreatForm /> 
    </View>
  );
};

export default CreateGuideTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
