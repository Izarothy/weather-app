import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const dayStyle = StyleSheet.create({
  container: {
    display: 'flex',
  },
});

const Day = ({ dayWeather }: any) => {
  useEffect(() => {
    console.log(dayWeather);
  }, []);

  return (
    <View style={dayStyle.container}>
      <Text>{JSON.stringify(dayWeather[0])}</Text>
    </View>
  );
};
export default Day;
