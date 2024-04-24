import CustomSearchButton from '../components/customSearchButton';
import CustomTextBox from '../components/textBox';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import SearchHandler from '../webserver/SearchHander';




export default function SearchScreen({ navigation }) {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

  const SearchPressed = async () => {
    try {
      console.log("games")
      let gamesArray = [];
      const res = await SearchHandler();
      console.log("response:", res); // Logging the entire response object for debugging
        for(let i = 0; i < res.length; i++) {
          console.log("loop:" + res[i])
          if (res[i].title.includes(query)) {
            gamesArray.push(res[i])
          }
        }
        setGames(gamesArray)


    } catch (error) {
        console.error("Error during sign-in:", error.message);
    }
};

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
      <CustomTextBox placeholder="Search" onChangeText={text => setQuery(text)} value={query} />
      <CustomSearchButton onPress={SearchPressed} />

    </View>
    <ScrollView contentContainerStyle={styles.container}>
    {games.map(game => (
      <TouchableOpacity key={game.id} style={styles.gameContainer} onPress={() => navigation.navigate('ReviewScreen', { game })}>
        <Text style={styles.gameTitle}>{game.title}</Text>
        <Image source={{ uri: game.image }} style={styles.image} />
        <Text>Developer: {game.developer}</Text>
        <Text>Genre: {game.genre.join(', ')}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  gameTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover'
  },
  reviewText: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});