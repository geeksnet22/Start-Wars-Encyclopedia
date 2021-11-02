import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { gql, useQuery } from "@apollo/client";

export default function LikedCharctersTab() {
  const { loading, error, data } = useQuery(GET_LIKED_CHARACTERS);

  console.log(data);

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.body}>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.body}>Oops, Something went wrong...</Text>
      </View>
    );

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    padding: 10,
  },
  body: {
    fontSize: 15,
    color: "white",
    paddingVertical: 5,
  },
});
