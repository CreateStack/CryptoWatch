import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '../config/colors';
import Separator from './Separator';

function InvestmentOverview({invested, current, pl, plPercent, theme}) {
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <View style={styles.invested}>
          <Text style={styles.upperText}>Invested</Text>
          <Text style={styles.lowerText}>{invested}</Text>
        </View>
        <View style={styles.current}>
          <Text style={styles.upperText}>Current</Text>
          <Text style={styles.lowerText}>1,73,711.17</Text>
        </View>
      </View>
      <Separator style={styles.separator} dashColor={colors[theme].grey} />
      <View style={styles.overview}>
        <View style={styles.invested}>
          <Text style={styles.PLText}>P&L</Text>
        </View>
        <View style={styles.percent}>
          <Text style={styles.PL}>+14,103.50 </Text>
          <Text style={styles.PLPercent}> +8.84 %</Text>
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
      fontSize: 12,
      paddingBottom: 2,
    },
    lowerText: {
      color: colors[theme].white,
      fontSize: 18,
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
      fontSize: 18,
    },
    PL: {
      color: colors[theme].green,
      fontSize: 18,
    },
    PLPercent: {
      color: colors[theme].green,
      fontSize: 12,
    },
  });

export default InvestmentOverview;
