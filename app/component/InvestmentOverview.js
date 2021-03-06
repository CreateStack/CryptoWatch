import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '../config/colors';
import getPrice from '../util/getPrice';
import Separator from './Separator';
import {ms} from '../util/scale';

function InvestmentOverview({
  invested = 0,
  current = 0,
  theme,
  usdInr,
  currency,
}) {
  const styles = createStyles(theme);
  const pnl = current - invested;
  let profitPer = 0;
  if (invested > 0) profitPer = (pnl * 100) / invested;
  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <View style={styles.invested}>
          <Text style={styles.upperText}>Invested</Text>
          <Text style={styles.lowerText}>
            {getPrice(invested, usdInr, currency, 2)}
          </Text>
        </View>
        <View style={styles.current}>
          <Text style={styles.upperText}>Current</Text>
          <Text style={styles.lowerText}>
            {getPrice(current, usdInr, currency, 2)}
          </Text>
        </View>
      </View>
      <Separator style={styles.separator} dashColor={colors[theme].grey} />
      <View style={styles.overview}>
        <View style={styles.invested}>
          <Text style={styles.PLText}>P&L</Text>
        </View>
        <View style={styles.percent}>
          <Text
            style={{
              ...styles.PL,
              color: pnl >= 0 ? colors[theme].green : colors[theme].red,
            }}>
            {(pnl >= 0 ? '+' : '') + getPrice(pnl, usdInr, currency, 2)}{' '}
          </Text>
          <Text
            style={{
              ...styles.PLPercent,
              color: profitPer >= 0 ? colors[theme].green : colors[theme].red,
            }}>
            {(profitPer >= 0 ? '+' : '') + Number(profitPer).toFixed(2) + ' %'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].secondary,
      padding: 16,
      width: '100%',
      borderRadius: 5,
      elevation: 5,
    },
    overview: {
      flexDirection: 'row',
    },
    invested: {
      flex: 1,
      alignItems: 'flex-start',
    },
    current: {
      flex: 1,
      alignItems: 'flex-start',
    },
    upperText: {
      color: colors[theme].grey,
      fontSize: ms(12),
      paddingBottom: 2,
    },
    lowerText: {
      color: colors[theme].white,
      fontSize: ms(18),
      paddingTop: 2,
    },
    separator: {
      width: '91%',
      alignSelf: 'center',
      backgroundColor: colors[theme].grey,
      marginVertical: 16,
    },
    percent: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    PLText: {
      color: colors[theme].grey,
      fontSize: ms(18),
    },
    PL: {
      color: colors[theme].green,
      fontSize: ms(18),
    },
    PLPercent: {
      color: colors[theme].green,
      fontSize: ms(12),
    },
  });

export default InvestmentOverview;
