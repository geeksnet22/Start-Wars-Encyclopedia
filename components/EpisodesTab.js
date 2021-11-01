import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";

export const EPISODES = gql`
  query Episodes {
    allFilms {
      films {
        id
        title
        releaseDate
        openingCrawl
      }
    }
  }
`;

export default function EpisodesTab() {
  const { loading, error, data } = useQuery(EPISODES);
  const navigation = useNavigation();

  const EpisdoeCard = ({ id, title, releaseDate, openingCrawl }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MovieScreen", {
          id: id,
          title: title,
        })
      }
    >
      <View style={styles.episodeCard}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{releaseDate}</Text>
        <Text style={styles.body}>
          {JSON.stringify(openingCrawl)
            .replace(/(?:\\[rn])+/g, " ")
            .substring(0, 50)
            .concat("...")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <EpisdoeCard
      id={item.id}
      title={item.title}
      releaseDate={item.releaseDate}
      openingCrawl={item.openingCrawl}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.allFilms?.films}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#54ad7a",
  },
  episodeCard: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#2e4558",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  body: {
    color: "white",
    fontSize: 15,
  },
});
