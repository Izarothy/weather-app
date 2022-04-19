import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import fetchWeatherData from './lib/fetchWeatherData';

export default function App() {
  const [cityWeather, setCityWeather] = useState(null);
  const [inputCity, setInputCity] = useState('');
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.err}>{error}</Text>
      <Text>{cityWeather && cityWeather}</Text>
      <StatusBar />
      <TextInput
        style={styles.text}
        value={inputCity}
        onChangeText={setInputCity}
      />
      <Button
        title="Get weather data"
        onPress={async () => {
          const res = await fetchWeatherData(inputCity);

          if (!res) {
            setError("Sorry, we couldn't get that");
            return setInputCity('');
          }

          setCityWeather(res.city.name);

          // Reset to default on fetch
          setInputCity('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    borderWidth: 1,
    width: '40%',
    color: '#000',
    padding: 3,
    borderColor: 'blue',
  },

  err: {
    color: 'red',
    fontWeight: '500',
  },
});
