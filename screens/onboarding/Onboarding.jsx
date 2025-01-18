import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Animated,
  ActivityIndicator,
  Platform,
  NativeModules,
} from "react-native";
import Slides from "../../components/Onboard/Slides";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";

// Function to detect device language
const getDeviceLanguage = () => {
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  return language || "en";
};

const Onboarding = ({ navigation }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;
  const progress = useRef(new Animated.Value(0)).current;
  const language = getDeviceLanguage(); // Get the device language

  useEffect(() => {
    // Fetch the data from the API
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/onboarding/images`, {
          headers: {
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          }, // Send language header
        });
        const apiSlides = response.data.data.map((item) => ({
          id: item.id,
          title: item.title,
          subTitle: item.content,
          image: { uri: item.image },
        }));
        setSlides(apiSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    };

    fetchSlides();
  }, [language]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (currentSlideIndex + 1) * (100 / slides.length),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentSlideIndex]);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const newIndex = Math.floor(contentOffset.x / screenWidth);
    setCurrentSlideIndex(newIndex);
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate("Welcome");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Slides
            item={item}
            progress={progress}
            currentSlideIndex={currentSlideIndex}
            totalSlides={slides.length}
            onNext={handleNext}
          />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboarding;
