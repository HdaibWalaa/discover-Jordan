import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../../constants/theme";

const GenderOption = ({
  label,
  iconSource,
  isSelected,
  onPress,
  fullWidth,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.option,
        isSelected && styles.highlightedOption,
        fullWidth && styles.fullWidth,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          isSelected && styles.selectedImageContainer,
        ]}
      >
        <Image source={iconSource} style={styles.image} />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SelectGender = ({ label, selectedGender, setSelectedGender }) => {
  const handleGenderSelect = (genderLabel) => {
    const genderMapping = {
      "Male & Female": 0,
      Male: 1,
      Female: 2,
    };

    setSelectedGender(genderMapping[genderLabel]);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.optionsContainer}>
        <View style={styles.row}>
          <GenderOption
            label="Male"
            iconSource={require("../../assets/images/icons/male.png")}
            isSelected={selectedGender === 1}
            onPress={() => handleGenderSelect("Male")}
          />
          <GenderOption
            label="Female"
            iconSource={require("../../assets/images/icons/female.png")}
            isSelected={selectedGender === 2}
            onPress={() => handleGenderSelect("Female")}
          />
        </View>
        <GenderOption
          label="Male & Female"
          iconSource={require("../../assets/images/icons/both.png")}
          isSelected={selectedGender === 0}
          onPress={() => handleGenderSelect("Male & Female")}
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
  label: {
    fontFamily: "Medium",
    color:COLORS.dark,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
    padding: 16,
    margin: 8,
  },
  fullWidth: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  highlightedOption: {
    borderColor: "rgba(252, 210, 40, 1)",
    borderWidth: 1,
    backgroundColor: "rgba(252, 210, 40, 0.10)",
  },
  image: {
    width: 25,
    height: 25,
  },
  imageContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    overflow: "hidden",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImageContainer: {
    backgroundColor: COLORS.primary,
  },
  labelContainer: {
    marginLeft: 8,
  },
  labelText: {
    fontFamily: "Regular",
    fontSize: 14,
  },
});

export default SelectGender;
