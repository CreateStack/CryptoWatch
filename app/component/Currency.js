import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../config/colors';

function Currency() {
  const styles = createStyles('dark');
  return (
    <View style={styles.container}>
      <View style={styles.leftDetails}>
        <Text style={styles.leftTopBottomText}>4 Qty. • Avg. 3244.00</Text>
        <Text style={styles.leftMiddleText}>APOLLOHOSP</Text>
        <Text style={styles.leftTopBottomText}>Invested 12976.00</Text>
      </View>
      <View style={styles.rightDetails}>
        <Text style={styles.rightTopBottomText}>-1.14%</Text>
        <Text style={styles.rightMiddleText}>148.00</Text>
        <View style={styles.rightBottomContainer}>
          <Text style={styles.leftTopBottomText}>LTP 3207.00 </Text>
          <Text style={styles.rightTopBottomText}>(-0.97%)</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      width: '100%',
      backgroundColor: colors[theme].primary,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftDetails: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    rightDetails: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    leftTopBottomText: {
      color: colors[theme].grey,
      fontSize: 14,
      paddingVertical: 8,
    },
    leftMiddleText: {
      color: colors[theme].white,
      fontSize: 18,
    },
    rightTopBottomText: {
      color: colors[theme].red,
      fontSize: 14,
      paddingVertical: 8,
    },
    rightMiddleText: {
      color: colors[theme].red,
      fontSize: 18,
    },
    rightBottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Currency;
