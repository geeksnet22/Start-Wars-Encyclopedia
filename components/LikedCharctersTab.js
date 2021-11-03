import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";

export default function LikedCharctersTab() {
  const [likedCharacters, setLikedCharacters] = useState({});
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchLikedCharacters = async () => {
        const likedCharacters = await AsyncStorage.getItem("likedCharacters");
        setLikedCharacters(likedCharacters ? JSON.parse(likedCharacters) : {});
      };
      fetchLikedCharacters();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CharacterScreen", {
          id: item.id,
          name: item.name,
        })
      }
    >
      <View style={styles.nameContainer}>
        <Text style={styles.body}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <FlatList
        data={Object.entries(likedCharacters).map((character) => ({
          id: character[0],
          name: character[1],
        }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    padding: 10,
  },
  nameContainer: {
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#373738",
    padding: 5,
    alignSelf: "flex-start",
  },
  body: {
    fontSize: 15,
    color: "white",
    paddingVertical: 5,
  },
});
