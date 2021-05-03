import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import colors from '../config/colors';
import AddCurrency from './AddCurrency';

function Footer(props) {
  const styles = createStyles('dark');
  const [addCurrencyVisible, setAddCurrencyVisible] = React.useState(true);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.desc}>Today's P&L</Text>
        <TouchableOpacity
          style={styles.addContainer}
          onPress={() => setAddCurrencyVisible(visible => !visible)}>
          <Icon name="pluscircleo" size={40} color={colors['dark'].blue} />
        </TouchableOpacity>
        <View style={styles.figures}>
          <Text style={styles.number}>-1,209.79 </Text>
          <Text style={styles.percent}> -0.69%</Text>
        </View>
      </View>
      <AddCurrency
        visible={addCurrencyVisible}
        setVisible={setAddCurrencyVisible}
      />
    </>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    addContainer: {
      backgroundColor: colors[theme].secondary,
      position: 'absolute',
      left: Dimensions.get('window').width / 2 - 20,
      top: -18,
      borderWidth: 8,
      borderRadius: 100,
      borderColor: colors[theme].secondary,
    },
    container: {
      backgroundColor: colors[theme].secondary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Dimensions.get('window').width,
    },
    figures: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    desc: {
      color: colors[theme].white,
      fontSize: 16,
    },
    number: {
      color: colors[theme].red,
      fontSize: 16,
    },
    percent: {
      color: colors[theme].red,
      fontSize: 14,
    },
  });

export default Footer;
