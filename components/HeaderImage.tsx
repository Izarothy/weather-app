import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

/* eslint-disable @typescript-eslint/no-var-requires */
const dayImage = require('../assets/day.jpg');
const nightImage = require('../assets/night.jpg');

/* eslint-enable @typescript-eslint/no-var-requires */

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '55%',
    overflow: 'hidden',
    borderRadius: 5,
  },

  headerText: {
    paddingLeft: '5%',
    paddingTop: '5%',
    color: '#fff',
    fontSize: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: 1 },
    fontWeight: '600',
  },

  todayText: {
    fontSize: 24,
  },
});
type HeaderImageProps = {
  hour: number;
  cityName: string;
  weekDay: string;
  day: number;
  month: string;
};

const HeaderImage = ({
  hour,
  cityName,
  weekDay,
  day,
  month,
}: HeaderImageProps) => (
  // @ts-ignore
  <ImageBackground
    style={styles.image}
    source={hour > 6 && hour < 18 ? dayImage : nightImage}
  >
    <View>
      <Text style={styles.headerText}>{cityName}</Text>
      <Text style={[styles.headerText, styles.todayText]}>Today</Text>
      <Text style={styles.headerText}>{`${weekDay}, ${day} ${month}`}</Text>
    </View>
  </ImageBackground>
);

export default HeaderImage;
