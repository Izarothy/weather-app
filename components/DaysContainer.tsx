import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Day from './Day';

const DaysContainer = ({ weatherData }: any) => {
  const [weekWeather, setWeekWeather] = useState<any[]>([]);

  useEffect(() => {
    setWeekWeather([]);

    Object.values(weatherData).forEach((weekDay: any, idx: number) => {
      if (idx === 5) return; // We don't want the last day

      setWeekWeather((prevState: any) => [...prevState, weekDay]);
    });
  }, [weatherData]);

  return (
    <View>
      {weekWeather.length > 1 &&
        weekWeather.map((day: any, idx: number) => (
          <Day key={idx} dayWeather={day} />
        ))}
    </View>
  );
};

export default DaysContainer;
