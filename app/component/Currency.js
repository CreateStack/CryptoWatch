import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../config/colors';

function Currency({item = {}, theme, ticker = {}}) {
  const styles = createStyles(theme);
  let percent = 0;
  let profit = 0;
  let dailyPer = 0;
  if (item.quantity * item.buyPrice && ticker[item.id]) {
    profit = ticker[item.id]?.value - item.quantity * item.buyPrice;
    percent = (profit * 100) / (item.quantity * item.buyPrice);
    dailyPer =
      ((ticker[item.id]?.price - ticker[item.id].close) * 100) /
      ticker[item.id].close;
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftDetails}>
        <Text style={styles.leftTopBottomText}>
          {item.quantity + ' Qty.  •  Avg. ' + item.buyPrice}
        </Text>
        <Text style={styles.leftMiddleText}>
          {item.name + ' (' + item.id + ')'}
        </Text>
        <Text style={styles.leftTopBottomText}>
          {'Invested ' + (item.quantity * item.buyPrice).toFixed(2)}
        </Text>
      </View>
      <View style={styles.rightDetails}>
        <Text
          style={{
            ...styles.rightTopBottomText,
            color: percent >= 0 ? colors[theme].green : colors[theme].red,
          }}>
          {(percent >= 0 ? '+' : '') + Number(percent).toFixed(2) + '%'}
        </Text>
        <Text
          style={{
            ...styles.rightMiddleText,
            color: profit >= 0 ? colors[theme].green : colors[theme].red,
          }}>
          {(profit >= 0 ? '+' : '') + Number(profit).toFixed(2)}
        </Text>
        <View style={styles.rightBottomContainer}>
          <Text style={styles.leftTopBottomText}>
            {'LTP ' + Number(ticker[item.id]?.price).toFixed(2) + ' '}
          </Text>
          <Text
            style={{
              ...styles.rightTopBottomText,
              color: dailyPer >= 0 ? colors[theme].green : colors[theme].red,
            }}>
            {'(' +
              (dailyPer >= 0 ? '+' : '') +
              Number(dailyPer).toFixed(2) +
              '%)'}
          </Text>
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
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    rightDetails: {
      flex: 1,
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
