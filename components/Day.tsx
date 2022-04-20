import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MinifiedWeatherT } from '../types/MinifiedWeather';

const dayStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  test: {
    marginHorizontal: 5,
  },
});

const Day = ({ dayWeather }: any) => {
  const minifiedWeather: MinifiedWeatherT = {
    morningTemp: 0,
    dayTemp: 0,
    nightTemp: 0,
    humidity: 0,
    minTemp: 0,
    maxTemp: 0,
    meanTemp: 0,
  };

  const [weather, setWeather] = useState(minifiedWeather);
  useEffect(() => {
    // We don't need the whole structure, just morning / day / night temperatures, overall humidity, min/max temp, mean and mode of temp

    /* eslint-disable @typescript-eslint/restrict-plus-operands */
    minifiedWeather.meanTemp = Math.round(
      dayWeather.reduce((a: number, b: any) => a + b.main.temp, 0) /
        dayWeather.length
    );

    minifiedWeather.minTemp = Math.min(
      ...dayWeather.map((timestamp: any) => timestamp.main.temp)
    );

    minifiedWeather.maxTemp = Math.max(
      ...dayWeather.map((timestamp: any) => timestamp.main.temp)
    );

    dayWeather.forEach((timestamp: any) => {
      const date = new Date(timestamp.dt * 1000);
      const hours = date.getUTCHours();

      const { main } = timestamp;

      switch (hours) {
        case 6:
          minifiedWeather.morningTemp = parseInt(main.temp);
          break;
        case 12:
          minifiedWeather.dayTemp = parseInt(main.temp);
          minifiedWeather.humidity = main.humidity;
          break;
        case 21:
          minifiedWeather.nightTemp = parseInt(main.temp);
          break;
        default:
          break;
      }
    });

    setWeather(minifiedWeather);
  }, [dayWeather]);

  return (
    <View style={dayStyle.container}>
      {Object.values(weather).map((value: number, idx: number) => (
        <Text style={dayStyle.test} key={idx}>
          {value > 0 ? value : '-'}
        </Text>
      ))}
    </View>
  );
};
export default Day;
