import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type PickWeekDayProps = {
  weekDays: string[] | null;
  pickedDay: string;
  setPickedDay: (day: string) => void;
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '5%',
  },

  pickedDay: {
    marginTop: '3%',
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
  },
});

const PickWeekDay = ({
  weekDays,
  pickedDay,
  setPickedDay,
}: PickWeekDayProps) => (
  <View style={styles.mainContainer}>
    <View style={styles.container}>
      {weekDays &&
        weekDays.map(
          (day: string) =>
            day && (
              <Button
                title={day}
                onPress={() => {
                  setPickedDay(day);
                }}
                color="#000"
                key={day}
              />
            )
        )}
    </View>
    <Text style={styles.pickedDay}>{pickedDay}</Text>
  </View>
);

export default PickWeekDay;
