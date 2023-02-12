import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, Button } from 'react-native';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const getRecipes = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
        .then(response => response.json())
        .then(data => setRecipes(data.meals))
        .catch(error => {
          console.error('Error fetching recipes: ', error);
        });
    };

    getRecipes();
  }, [keyword]);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipe}>
            <Image style={styles.thumbnail} source={{ uri: item.strMealThumb }} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={text => setKeyword(text)}
        placeholder="Enter ingredient"
      />
      <Button title="Search" onPress={() => setKeyword(keyword)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 50
  },
  input: {
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  recipe: {
    alignItems: 'center',
    marginVertical: 10,
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default App;
