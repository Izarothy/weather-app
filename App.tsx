import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
} from 'react-native';

import DaysContainer from './components/DaysContainer';
import HeaderImage from './components/HeaderImage';
import PickWeekDay from './components/PickWeekDay';
import fetchWeatherData from './lib/fetchWeatherData';
import groupBy from './lib/groupObjectsByProp';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: '5%',
  },

  header: {
    fontWeight: '900',
    fontSize: 28,
    textAlign: 'center',
    marginTop: '10%',
  },

  text: {
    borderWidth: 2,
    width: '40%',
    color: '#000',
    padding: 5,
    borderColor: 'black',
    marginBottom: '3%',
  },

  err: {
    color: 'red',
    fontWeight: '500',
  },
});

export default function App() {
  const [cityWeather, setCityWeather] = useState([[]]);
  const [inputCity, setInputCity] = useState('');
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('');
  const [pickedDay, setPickedDay] = useState('Today');

  const now = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const weekDay = weekDays[now.getDay()];
  const month = months[now.getMonth()];
  const day = now.getDate();
  const hour = now.getHours();

  return (
    <>
      <Text style={styles.header}>Weather forecast</Text>
      <View style={styles.container}>
        <Text style={styles.err}>{error}</Text>
        {/* hour, cityName, weekDay, day, month, */}
        <HeaderImage
          hour={hour}
          cityName={cityName}
          weekDay={weekDay}
          day={day}
          month={month}
        />
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
              setCityName('');
              return setInputCity('');
            }

            // The API returns 40 timestamps between 3 hours (8 per day per 5 days) as an array, so I split it into 5 arrays corresponding to each day
            res.list.forEach(
              (item: any) => (item.day = new Date(item.dt * 1000).getDate())
            );

            const groupByDay = groupBy('day');

            setCityWeather(groupByDay(res.list));

            setCityName(`${res.city.name}, ${res.city.country}`);
            // Reset to default on fetch
            setError('');
            setInputCity('');
          }}
        />
        {Object.keys(cityWeather).length > 1 && (
          <PickWeekDay
            setPickedDay={setPickedDay}
            // @ts-ignore
            weekDays={Object.values(cityWeather).map(
              // eslint-disable-next-line array-callback-return
              (weekday: any, idx: number) => {
                if (idx === 5) return;

                if (new Date(weekday[0].dt * 1000).getDate() === day)
                  return 'Today';
                return weekDays[new Date(weekday[0].dt * 1000).getDay()];
              }
            )}
          />
        )}
        {Object.values(cityWeather).length > 1 && (
          <DaysContainer weatherData={cityWeather} />
        )}
      </View>
    </>
  );
}
