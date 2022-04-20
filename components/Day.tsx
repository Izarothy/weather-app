import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MinifiedWeatherT } from '../types/MinifiedWeather';

const dayStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  weekDay: {
    textAlign: 'center',
  },

  test: {
    marginHorizontal: '2%',
  },

  infoContainer: {
    width: '50%',
    color: 'gray',
    fontSize: 17,
  },

  info: {
    fontSize: 20,
    color: '#000',
  },
});

const Day = ({ dayWeather }: any) => {
  const [weather, setWeather] = useState({} as MinifiedWeatherT);
  useEffect(() => {
    const minifiedWeather: MinifiedWeatherT = {
      morningTemp: 0,
      dayTemp: 0,
      nightTemp: 0,
      humidity: 0,
      minTemp: 0,
      maxTemp: 0,
      meanTemp: 0,
    };
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

  const {
    morningTemp,
    dayTemp,
    nightTemp,
    humidity,
    minTemp,
    maxTemp,
    meanTemp,
  } = weather;
  return (
    <View style={dayStyle.container}>
      <Text style={dayStyle.infoContainer}>
        Morning <Text style={dayStyle.info}>{morningTemp}℃</Text>
      </Text>
      <Text style={dayStyle.infoContainer}>
        Day <Text style={dayStyle.info}>{dayTemp}℃</Text>
      </Text>
      <Text style={dayStyle.infoContainer}>
        Night <Text style={dayStyle.info}>{nightTemp}℃</Text>
      </Text>
      <Text style={dayStyle.infoContainer}>
        Humidity <Text style={dayStyle.info}>{humidity}%</Text>
      </Text>
      <Text style={dayStyle.infoContainer}>
        Max. temp <Text style={dayStyle.info}>{minTemp}℃</Text>
      </Text>
      <Text style={dayStyle.infoContainer}>
        Min. temp <Text style={dayStyle.info}>{maxTemp}℃</Text>
      </Text>
      <Text style={dayStyle.infoContainer}>
        Mean temp <Text style={dayStyle.info}>{meanTemp}℃</Text>
      </Text>
    </View>
  );
};
export default Day;
