import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type PickWeekDayProps = {
  weekDays: string[] | null;
  setPickedDay: (day: string) => void;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '5%',
  },
});

const PickWeekDay = ({ weekDays, setPickedDay }: PickWeekDayProps) => (
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
);

export default PickWeekDay;
