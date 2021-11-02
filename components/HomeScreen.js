import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import EpisodesTab from "./EpisodesTab";
import LikedCharctersTab from "./LikedCharctersTab";

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarStyle: {
          backgroundColor: "#1f1f1f",
        },
      }}
    >
      <Tab.Screen name="Episodes" component={EpisodesTab} />
      <Tab.Screen name="Liked characters" component={LikedCharctersTab} />
    </Tab.Navigator>
  );
}
