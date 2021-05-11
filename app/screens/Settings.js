import React from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';

import colors from '../config/colors';
import {ms, s, vs} from '../util/scale';
import Separator from '../component/Separator';
import useStore from '../store/useStore';

function Settings(props) {
  const {getState, changeTheme, subscribeStore, changeCurrency} = useStore();
  const [darkMode, setDarkMode] = React.useState(getState().crypto.darkMode);
  const theme = darkMode ? 'dark' : 'light';
  const styles = createStyles(theme);
  let unSubscribe = subscribeStore(async () => {
    setDarkMode(await getState().crypto.darkMode);
  });
  const [isEnabled, setIsEnabled] = React.useState(darkMode);
  React.useEffect(() => {
    return () => unSubscribe();
  }, []);
  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      changeTheme(!previousState);
      return !previousState;
    });
  };
  const [baseCurrency, setBaseCurrency] = React.useState(
    getState().crypto.currency,
  );
  return (
    <View style={styles.container}>
      <Separator
        dashColor={colors[theme].grey}
        dashStyle={{height: 0.5}}
        style={{width: '100%'}}
      />
      <View style={styles.darkModeContainer}>
        <Text style={styles.darkModeText}>Dark mode</Text>
        <Switch
          trackColor={{
            false: colors[theme].grey,
            true: colors[theme].blue,
          }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor={colors[theme].primary}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Separator
        dashColor={colors[theme].grey}
        dashStyle={{height: 0.5}}
        style={{width: '100%'}}
      />
      <View style={styles.darkModeContainer}>
        <Text style={styles.darkModeText}>Base currency</Text>
        <TouchableOpacity
          onPress={() =>
            setBaseCurrency(v => {
              if (v === 'INR') {
                changeCurrency('USD');
                return 'USD';
              }
              changeCurrency('INR');
              return 'INR';
            })
          }
          style={styles.currencySelector}>
          <Text style={styles.currencyText}>{baseCurrency}</Text>
        </TouchableOpacity>
      </View>
      <Separator
        dashColor={colors[theme].grey}
        dashStyle={{height: 0.5}}
        style={{width: '100%'}}
      />
      <View style={styles.darkModeContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ApiKeyGeneration')}
          style={styles.apiKey}>
          <Text style={styles.darkModeText}>API Key</Text>
        </TouchableOpacity>
      </View>
      <Separator
        dashColor={colors[theme].grey}
        dashStyle={{height: 0.5}}
        style={{width: '100%'}}
      />
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    apiKey: {
      width: '100%',
    },
    container: {
      backgroundColor: colors[theme].primary,
      flex: 1,
      width: '100%',
    },
    currencySelector: {
      backgroundColor: colors[theme].blue,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    currencyText: {
      color: colors[theme].white,
      fontWeight: 'bold',
      fontSize: ms(14),
    },
    darkModeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    darkModeText: {
      color: colors[theme].white,
      fontSize: ms(16),
    },
  });

export default Settings;
