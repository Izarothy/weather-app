import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import fetchWeatherData from './lib/fetchWeatherData';

export default function App() {
  const [cityWeather, setCityWeather] = useState(null);
  const [inputCity, setInputCity] = useState('');

  return (
    <View style={styles.container}>
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

          // 200 is the API's internal code for success
          if (res.cod !== '200') return;

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
});
