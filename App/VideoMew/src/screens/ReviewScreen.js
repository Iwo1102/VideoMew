import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CustomTextBox from '../components/textBox';
import CustomSearchButton from '../components/customSearchButton';
import axios from 'axios';
import { requestData } from '../webserver/AsyncData';
import reviewAddHandler from '../webserver/RewiewAddHandler';


export default function ReviewScreen({ route }) {
  const { game } = route.params;

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [tempRating, setTempRating] = useState('');

  const submitReview = async () => {
    console.log('Comment:', comment);
    console.log('Rating:', rating);
  
    try {
      if (rating > 5 ) {
        setRating(5)
      } else {
        setRating(rating)
      }
      const response = await reviewAddHandler(game.title, rating, comment)
      if (response.success) {
        alert('Review submitted successfully!');
      } else {
        alert('Failed to submit review: ' + response.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>{game.title}</Text>
        <Image source={{ uri: game.image }} style={styles.image} />
        <Text>Developer: {game.developer}</Text>
        <Text>Genre: {game.genre.join(', ')}</Text>
      </View>
      
      <CustomTextBox
        placeholder="Leave a comment"
        onChangeText={text => setComment(text)}
        value={comment}
      />
      
      <CustomTextBox
        placeholder="Rate the game (1-5)"
        onChangeText={text => setRating(text)}
        value={rating}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={submitReview} style={styles.button}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
});

