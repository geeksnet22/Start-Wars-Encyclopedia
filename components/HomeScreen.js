import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View, Text, StatusBar } from "react-native";
import EpisodesTab from "./EpisodesTab";
import LikedCharacters from "./LikedCharacters";

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#1f1f1f",
        },
        indicatorStyle: {
          backgroundColor: "white",
        },
        activeTintColor: "white",
      }}
    >
      <Tab.Screen name="Episodes" component={EpisodesTab} />
      <Tab.Screen name="Liked characters" component={LikedCharacters} />
    </Tab.Navigator>
  );
}
