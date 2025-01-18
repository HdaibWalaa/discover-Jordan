import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ReviewsTab, PostsTab } from "./Tabs";

const Tab = createMaterialTopTabNavigator();

const PlaceTabView = ({ reviews, posts }) => {
  console.log(
    "PlaceTabView rendered with reviews:",
    reviews,
    "and posts:",
    posts
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen name="Reviews">
        {() => <ReviewsTab reviews={reviews} />}
      </Tab.Screen>
      <Tab.Screen name="Posts">{() => <PostsTab posts={posts} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default PlaceTabView;
