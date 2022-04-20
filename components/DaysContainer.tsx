import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Day from './Day';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DaysContainer = ({ weatherData, pickedDay }: any) => {
  const [weekWeather, setWeekWeather] = useState<any[]>([]);

  useEffect(() => {
    setWeekWeather([]);

    Object.values(weatherData).forEach((weekDay: any, idx: number) => {
      if (idx === 5) return; // We don't want the last day

      setWeekWeather((prevState: any) => [...prevState, weekDay]);
    });
  }, [weatherData]);

  let weekDayInNumber = weekDays.indexOf(pickedDay);
  if (weekDayInNumber === -1) weekDayInNumber = new Date().getDay();

  return (
    <View>
      {weekWeather.length > 1 &&
        weekWeather.map(
          (day: any, idx: number) =>
            new Date(day[0].dt * 1000).getDay() === weekDayInNumber && (
              <Day key={idx} dayWeather={day} />
            )
        )}
    </View>
  );
};

export default DaysContainer;
