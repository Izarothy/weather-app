import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import fetchWeatherData from './lib/fetchWeatherData';

export default function App() {
  const [cityWeather, setCityWeather] = useState(null);

  useEffect(() => {
    console.log(cityWeather);
  }, [cityWeather]);

  return (
    <View style={styles.container}>
      <Text>Weather App</Text>
      <StatusBar style="auto" />
      <Button
        title="Fetch"
        onPress={async () => {
          const res = await fetchWeatherData('Warsaw');
          setCityWeather(res.list[0].main);
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
});
