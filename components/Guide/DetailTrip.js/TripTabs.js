import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TripTabs = ({ trip }) => {
  const [activeTab, setActiveTab] = useState("activities");

  const tabs = [
    { key: "activities", label: "Activities" },
    { key: "assemblies", label: "Assemblies" },
    { key: "age_price", label: "Age Price" },
    { key: "price_include", label: "Price Include" },
    { key: "requirements", label: "Requirements" },
    ...(trip.trail ? [{ key: "trail", label: "Trail" }] : []),
  ];

const renderTabContent = () => {
  const renderTagItem = ({ item }) => (
    <View style={styles.tagItem}>
      <Text style={styles.tagText}>{item}</Text>
    </View>
  );

  switch (activeTab) {
    case "activities":
    case "price_include":
    case "requirements":
      return (
        <FlatList
          key={`${activeTab}-2`} // Unique key for FlatList
          data={trip[activeTab]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTagItem}
          numColumns={2}
          contentContainerStyle={styles.tagsContainer}
        />
      );

    case "age_price":
      return (
        <FlatList
          key="age_price-1"
          data={trip.age_price}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.agePriceItem}>
              {/* Age Section */}
              <View style={styles.agePriceDetail}>
                <Image
                  source={require("../../../assets/images/icons/datecalender.png")}
                  style={styles.agePriceIcon}
                  resizeMode="contain"
                />
                <Text style={styles.agePriceText}>
                  {item.min_age} - {item.max_age} years
                </Text>
              </View>

              {/* Price Section */}
              <View style={styles.agePriceDetail}>
                <Image
                  source={require("../../../assets/images/icons/dollar.png")}
                  style={styles.agePriceIcon}
                  resizeMode="contain"
                />
                <Text style={styles.agePriceText}>{item.price} JOD</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.agePriceContainer}
        />
      );

    case "assemblies":
      return (
        <FlatList
          key="assemblies-1"
          data={trip.assemblies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.assemblyItem}>
              {/* Place Section */}
              <View style={styles.assemblyDetail}>
                <Image
                  source={require("../../../assets/images/icons/Assemblies.png")}
                  style={styles.assemblyIcon}
                  resizeMode="contain"
                />
                <Text style={styles.assemblyText}>{item.place}</Text>
              </View>

              {/* Time Section */}
              <View style={styles.assemblyDetail}>
                <Image
                  source={require("../../../assets/images/icons/clock.png")}
                  style={styles.assemblyIcon}
                  resizeMode="contain"
                />
                <Text style={styles.assemblyText}>{item.time}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.assemblyContainer}
        />
      );

    case "trail":
      return (
        <View style={styles.trailContainer}>
          {/* Difficulty Section */}
          <View style={styles.trailDetail}>
            <Image
              source={require("../../../assets/images/icons/difficulty.png")}
              style={styles.trailIcon}
              resizeMode="contain"
            />
            <Text style={styles.trailText}>
              Difficulty: {trip.trail.difficulty}
            </Text>
          </View>

          {/* Duration Section */}
          <View style={styles.trailDetail}>
            <Image
              source={require("../../../assets/images/icons/clock.png")}
              style={styles.trailIcon}
              resizeMode="contain"
            />
            <Text style={styles.trailText}>
              Duration: {trip.trail.min_duration_in_minute} -{" "}
              {trip.trail.max_duration_in_minute} minutes
            </Text>
          </View>
        </View>
      );

    default:
      return null;
  }
};




  return (
    <View>
      {/* Scrollable Tabs Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab.key && styles.activeTabButtonText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Tab Content Section */}
      <View style={styles.tabContent}>{renderTabContent()}</View>
    </View>
  );
};

export default TripTabs;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    marginVertical: hp("2%"),
    paddingHorizontal: wp("4%"),
  },
  tabButton: {
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.lightGray,
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
  },
  tabButtonText: {
    fontSize: TEXT.small,
    color: COLORS.gray,
  },
  activeTabButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  tabContent: {
    paddingHorizontal: wp("4%"),
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.base,
    fontFamily: "Medium",
  },
  tabContentText: {
    fontSize: TEXT.small,
    color: COLORS.dark,
    marginVertical: hp("0.5%"),
  },
  tagsContainer: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("2%"),
    flexDirection: "column",
    justifyContent: "space-between",
  },

  tagItem: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: wp("5%"),
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("3%"),
    margin: wp("1%"),
  },
  tagText: {
    fontSize: wp("3.5%"),
    color: COLORS.black,
  },
  agePriceContainer: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
  },
  agePriceItem: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    marginBottom: hp("1%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    elevation: 1,
  },
  agePriceDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  agePriceIcon: {
    width: wp("5%"),
    height: wp("5%"),
    marginRight: wp("2%"),
  },
  agePriceText: {
    fontSize: TEXT.small,
    color: COLORS.dark,
  },
  assemblyContainer: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
  },
  assemblyItem: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    marginBottom: hp("1%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    elevation: 1,
  },
  assemblyDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  assemblyIcon: {
    width: wp("5%"),
    height: wp("5%"),
    marginRight: wp("2%"),
  },
  assemblyText: {
    fontSize: TEXT.small,
    color: COLORS.dark,
  },
  trailContainer: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    elevation: 1,
  },
  trailDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  trailIcon: {
    width: wp("5%"),
    height: wp("5%"),
    marginRight: wp("2%"),
  },
  trailText: {
    fontSize: TEXT.small,
    color: COLORS.dark,
  },
});
