import React, { useContext, useState, useEffect } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import axios from "axios";
import ReusableBtn from "../../Buttons/ReusableBtn";
import { COLORS } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";
import BASE_URL from "../../../hook/apiConfig";

const InterestButton = ({ volunteerId, interestedUsers }) => {
  const { token, userId } = useContext(AuthContext); // Assuming userId is part of the AuthContext
  const [isInterested, setIsInterested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if the user is already interested when the component mounts
  useEffect(() => {
    if (interestedUsers?.some((user) => user.id === userId)) {
      setIsInterested(true); // User is already interested
    } else {
      setIsInterested(false); // User is not interested
    }
  }, [interestedUsers, userId]);

  const handleToggleInterest = async () => {
    setIsLoading(true);
    const url = isInterested
      ? `${BASE_URL}/volunteering/disinterest/${volunteerId}`
      : `${BASE_URL}/volunteering/interest/${volunteerId}`;

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert(
          "Success",
          isInterested
            ? "You have successfully removed your interest."
            : "You have successfully shown interest."
        );
        setIsInterested(!isInterested); // Toggle the interest state
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Info", error.response.data.msg);
      } else {
        Alert.alert("Error", error.message || "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator color={COLORS.primary} size="large" />
      ) : (
        <ReusableBtn
          onPress={handleToggleInterest}
          btnText={
            isInterested
              ? "Remove from Interest"
              : "Interest".toLocaleUpperCase()
          }
          backgroundColor={COLORS.primary}
          width={294}
          borderColor={COLORS.primary}
          borderWidth={0}
          textColor={COLORS.black}
        />
      )}
    </View>
  );
};

export default InterestButton;
