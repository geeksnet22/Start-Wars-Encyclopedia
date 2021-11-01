import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LikedCharacters() {
  return (
    <View style={styles.container}>
      <FlatList></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
});
