import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import BASE_URL from "../../../hook/apiConfig";
import ReusableText from "../../Reusable/ReusableText";

const TripJoinForm = ({ guideTripId, token, onJoinSuccess }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
  });

  const handleAddSubscriber = () => {
    if (form.first_name && form.last_name && form.age && form.phone_number) {
      setSubscribers([...subscribers, form]);
      setForm({ first_name: "", last_name: "", age: "", phone_number: "" });
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  const handleJoinTrip = async () => {
    if (subscribers.length === 0) {
      Alert.alert("Error", "Please add at least one subscriber.");
      return;
    }

    const requestData = {
      guide_trip_id: guideTripId,
      subscribers,
    };

    console.log("Request Data:", requestData);
    console.log("Token:", token);

    try {
      const response = await fetch(`${BASE_URL}/user/guide-trip/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "DISCOVERJO91427",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response URL:", response.url);

      if (response.url.includes("login")) {
        Alert.alert("Error", "Authentication failed. Please log in again.");
        return;
      }

      const result = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Result:", result);

      if (response.status === 200) {
        Alert.alert("Success", "You have successfully joined the trip.");
        setSubscribers([]);
        onJoinSuccess();
      } else {
        Alert.alert("Error", result.msg || "Failed to join the trip.");
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Form Section */}
      <View style={styles.formContainer}>
        <ReusableText
          text={"enter the users info".toLocaleUpperCase()}
          family={"Medium"}
          size={TEXT.medium}
          color={COLORS.dark}
          style={styles.titleText}
        />
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={form.first_name}
          onChangeText={(text) => setForm({ ...form, first_name: text })}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={form.last_name}
          onChangeText={(text) => setForm({ ...form, last_name: text })}
        />
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
          value={form.age}
          onChangeText={(text) => setForm({ ...form, age: text })}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
          value={form.phone_number}
          onChangeText={(text) => setForm({ ...form, phone_number: text })}
        />
      </View>

      {/* Scrollable Subscribers List */}
      <View style={styles.listContainer}>
        <FlatList
          data={subscribers}
          keyExtractor={(item, index) => `${item.phone_number}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.subscriberItem}>
              {/* Name */}
              <View style={styles.subscriberDetail}>
                <Image
                  source={require("../../../assets/images/icons/usernametrip.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.subscriberText}>
                  {item.first_name} {item.last_name}
                </Text>
              </View>

              {/* Age */}
              <View style={styles.subscriberDetail}>
                <Image
                  source={require("../../../assets/images/icons/datecalender.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.subscriberText}>{item.age} years old</Text>
              </View>

              {/* Phone Number */}
              <View style={styles.subscriberDetail}>
                <Image
                  source={require("../../../assets/images/icons/telephone.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.subscriberText}>{item.phone_number}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinTrip}>
          <Text style={styles.joinButtonText}>Join Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addUserButton}
          onPress={handleAddSubscriber}
        >
          <View style={styles.addUserText}>
            <Image
              source={require("../../../assets/images/icons/followUser.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripJoinForm;

const styles = StyleSheet.create({
  container: {
    padding: wp("5%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
  },
  
  titleText: {
    marginBottom: hp("2%"),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.small,
    padding: wp("3%"),
    marginBottom: hp("1%"),
    fontFamily: "Medium",
    textAlign: "left",
  },
  listContainer: {
    height: hp("25%"), // Fixed height for scrollable list
    marginBottom: hp("2%"),
  },
  subscriberItem: {
    paddingVertical: hp("1%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  subscriberDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  subscriberText: {
    fontSize: wp("3.5%"),
    color: COLORS.black,
    marginLeft: wp("2%"),
  },
  bottomSection: {
    flexDirection: "row",
    paddingVertical: wp(1),
    justifyContent: "center",
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("1.5%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
    width: wp("50%"),
  },
  joinButtonText: {
    fontSize: wp("4.5%"),
    color: COLORS.black,
    fontWeight: "Medium",
  },
  addUserButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("1.5%"),
    borderRadius: wp("7%"),
    alignItems: "center",
    justifyContent: "center",
  },
  addUserText: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
    tintColor: COLORS.black,
  },
});
