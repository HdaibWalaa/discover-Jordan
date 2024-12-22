import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../screens/search/search.style";

const SearchInput = ({
  searchKey,
  setSearchKey,
  performSearch,
  onBackPress,
}) => {
  const navigation = useNavigation();
   const handleGoBack = () => {
     navigation.goBack();
   };
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.input}
          value={searchKey}
          onChangeText={setSearchKey}
          placeholder="Search..."
          placeholderTextColor="#999"
        />

        {searchKey.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchKey("")}
          >
            <Image
              source={require("../../assets/images/icons/close.png")} // Path to your close.png
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInput;
