import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function LibraryScreen({ navigation }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        fetchGames();  
    });

    return unsubscribe;
}, [navigation]);

  const fetchGames = async () => {
    try {
        const response = await fetch('http://54.81.45.41:3000/getAllGames');  
        const data = await response.json();
        setGames(data);
    } catch (error) {
        console.error('Failed to fetch games', error);
        alert('Failed to fetch games: ' + error.message);
    }
};


return (
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
  }
});
