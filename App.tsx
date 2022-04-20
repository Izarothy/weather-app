import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { arrayBuffer } from 'stream/consumers';
import Day from './components/Day';
import chunkArray from './lib/chunkArray';
import fetchWeatherData from './lib/fetchWeatherData';

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

  daysContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default function App() {
  const [cityWeather, setCityWeather] = useState([[]]);
  const [inputCity, setInputCity] = useState('');
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.err}>{error}</Text>
      <Text>{cityName}</Text>
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

          if (!res || res.cod !== '200') {
            setError("Sorry, we couldn't get that");
            setCityWeather([[]]);
            return setInputCity('');
          }

          // The API returns 40 timestamps between 3 hours (8 per day per 5 days) as an array, so I split it into 5 arrays corresponding to each day
          setCityWeather(res.list);

          setCityName(`${res.city.name}, ${res.city.country}`);
          // Reset to default on fetch
          setError('');
          setInputCity('');
          setCityName('');
        }}
      />
      <View style={styles.daysContainer}>
        {cityWeather[0].length > 1 &&
          cityWeather.map((day: any, idx: number) => (
            <Day key={idx} dayData={day} />
          ))}
      </View>
    </View>
  );
}
