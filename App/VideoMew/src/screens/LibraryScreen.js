import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function LibraryScreen({ navigation }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGames();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://54.81.45.41:3000/getAllGames');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Failed to fetch games', error);
      alert('Failed to fetch games: ' + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {games.map(game => (
        <TouchableOpacity
          key={game.id}
          style={styles.gameContainer}
          onPress={() => navigation.navigate('ReviewScreen', { game })}
          activeOpacity={0.7}
        >
          <Text style={styles.gameTitle}>{game.title}</Text>
          <Image source={{ uri: game.image }} style={styles.image} />
          <Text style={styles.text}>Developer: {game.developer}</Text>
          <Text style={styles.text}>Genre: {game.genre.join(', ')}</Text>
          {game.reviews && game.reviews.map((review, index) => (
            <View key={index} style={styles.reviewText}>
              <Text>Rating: {review.rating} Stars</Text>
              <Text>Comment: {review.comment}</Text>
            </View>
          ))}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'
  },
  gameContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  gameTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginVertical: 8
  },
  text: {
    fontSize: 16,
    color: '#666'
  },
  reviewText: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});