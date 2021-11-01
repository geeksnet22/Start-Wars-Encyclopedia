import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/core";

export const MOVIE_DETAILS = gql`
  query MovieDetails($id: ID!) {
    film(id: $id) {
      id
      title
      releaseDate
      openingCrawl
      speciesConnection {
        totalCount
      }
      planetConnection {
        totalCount
      }
      vehicleConnection {
        totalCount
      }
      characterConnection {
        characters {
          id
          name
        }
      }
    }
  }
`;

export default function MovieScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(MOVIE_DETAILS, {
    variables: { id: route.params?.id },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CharacterScreen", { id: item.id, name: item.name })
      }
    >
      <View style={styles.nameContainer}>
        <Text style={styles.body}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data?.film.title}</Text>
      <Text style={styles.body}>{data?.film.releaseDate}</Text>
      <Text style={styles.body}>
        {data?.film?.openingCrawl
          ? JSON.stringify(data.film.openingCrawl).replace(/(?:\\[rn])+/g, " ")
          : ""}
      </Text>
      <Text
        style={styles.body}
      >{`Species count: ${data?.film.speciesConnection.totalCount}`}</Text>
      <Text
        style={styles.body}
      >{`Planets count: ${data?.film.planetConnection.totalCount}`}</Text>
      <Text
        style={styles.body}
      >{`Total vehicles count: ${data?.film.vehicleConnection.totalCount}`}</Text>
      <View>
        <Text style={styles.body}>Characters</Text>
        <FlatList
          data={data?.film.characterConnection.characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e4558",
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  body: {
    fontSize: 15,
    color: "white",
    paddingVertical: 5,
  },
  nameContainer: {
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#8a8a8a",
    padding: 5,
    alignSelf: "flex-start",
  },
});
