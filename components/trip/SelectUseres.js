import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import { AuthContext } from "../../store/auth-context";
import { fetchFollowersApi } from "../../hook/followersApi"; // Import the API function

const SelectUsers = ({
  label,
  iconSource,
  iconSource2,
  onValueChange,
  value,
  width = 300,
}) => {
  const [selectedUser, setSelectedUser] = useState(value);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId = authCtx.userId;

  // Log to check if userId is being fetched properly
  useEffect(() => {
    console.log("userId from AuthContext:", userId); // Log userId to check if it's correctly fetched
  }, [userId]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!userId) {
        console.error("userId is null. Cannot fetch followers.");
        return;
      }

      try {
        const responseData = await fetchFollowersApi(token, userId); // Pass userId dynamically

        if (responseData && responseData.data && responseData.data.length > 0) {
          // Map the followers to the correct format for the picker
          const fetchedFollowers = responseData.data.map((follower) => ({
            label: follower.follower_name,
            value: follower.follower_id.toString(),
          }));
          setFollowers(fetchedFollowers);
        } else {
          Alert.alert(
            "No Followers",
            "You need to follow users to create this kind of trip."
          );
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
        Alert.alert("Error", "Failed to load followers.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [token, userId]);

  const handleValueChange = (value) => {
    setSelectedUser(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const pickerWidth = typeof width === "number" ? width : 300;

  return (
    <View style={[styles.container, { width: pickerWidth + 10 }]}>
      <ReusableText
        text={label}
        family={"Regular"}
        size={TEXT.medium}
        color={COLORS.black}
      />
      <View style={[styles.pickerWrapper, { width: pickerWidth }]}>
        <Image source={iconSource} style={styles.icon} />
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <RNPickerSelect
            onValueChange={handleValueChange}
            items={followers}
            placeholder={{ label: "Select a user...", value: null }}
            style={pickerSelectStyles}
            value={selectedUser}
            useNativeAndroidPickerStyle={false}
          />
        )}
        <Image source={iconSource2} style={styles.icon2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginLeft: 5,
  },
  pickerWrapper: {
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
    borderStyle: "solid",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  icon2: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: COLORS.black,
    paddingRight: 80,
  },
  inputAndroid: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: COLORS.black,
    paddingRight: 80,
  },
});

export default SelectUsers;
