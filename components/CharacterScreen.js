import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

const CHARACTER_DETAILS = gql`
  query CharacterDetails($id: ID!) {
    person(id: $id) {
      id
      birthYear
      height
      mass
      homeworld {
        name
      }
      filmConnection {
        films {
          id
          title
        }
      }
    }
  }
`;
export default function CharacterScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(CHARACTER_DETAILS, {
    variables: { id: route.params?.id },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieScreen", { id: item.id })}
    >
      <View style={styles.movieContainer}>
        <Text style={styles.body}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params?.name}</Text>
      <Text style={styles.body}>{`Birth year: ${data?.person.birthYear}`}</Text>
      <Text style={styles.body}>{`Height: ${data?.person.height}`}</Text>
      <Text style={styles.body}>{`Mass: ${data?.person.mass}`}</Text>
      <Text
        style={styles.body}
      >{`Home world: ${data?.person.homeworld.name}`}</Text>
      <FlatList
        data={data?.person.filmConnection.films}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  movieContainer: {
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#8a8a8a",
    padding: 5,
    alignSelf: "flex-start",
  },
});
