import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import Separator from '../component/Separator';

import colors from '../config/colors';
import useStore from '../store/useStore';

function Settings(props) {
  const {getState, changeTheme, subscribeStore} = useStore();
  const [darkMode, setDarkMode] = React.useState(getState().crypto.darkMode);
  const theme = darkMode ? 'dark' : 'light';
  const styles = createStyles(darkMode ? 'dark' : 'light');
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
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].primary,
      flex: 1,
      width: '100%',
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
      fontSize: 16,
    },
  });

export default Settings;
