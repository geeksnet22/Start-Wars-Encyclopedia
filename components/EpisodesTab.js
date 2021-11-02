import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);

  const toggleSwitch = () =>
    setIsToggleEnabled((previousState) => !previousState);

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

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.body}>Oldest</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <Switch onValueChange={toggleSwitch} value={isToggleEnabled} />
        </View>
        <Text style={styles.body}>Newest</Text>
      </View>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.listView}>
        <FlatList
          data={
            isToggleEnabled
              ? data?.allFilms?.films.slice().reverse()
              : data?.allFilms?.films
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f1f1f",
    flex: 1,
  },
  toggleContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  listView: {
    marginRight: 10,
    flex: 1,
  },
  episodeCard: {
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    backgroundColor: "#373738",
    borderRadius: 10,
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
