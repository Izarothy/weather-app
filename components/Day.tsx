import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const [morning, day, night] = [9, 12, 21];
const dayStyle = StyleSheet.create({
  container: {
    display: 'flex',
  },
});

const Day = ({ dayData }: any) => {
  dayData.map((timestamp: any, idx: number) => {
    if (idx > 0) console.log(timestamp.dt_txt);
  });

  return <View style={dayStyle.container} />;
};
export default Day;
