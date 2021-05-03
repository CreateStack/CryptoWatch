import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import Separator from '../component/Separator';

import colors from '../config/colors';

function Settings(props) {
  const styles = createStyles('dark');
  const [isEnabled, setIsEnabled] = React.useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <Separator
        dashColor={colors['dark'].grey}
        dashStyle={{height: 0.5}}
        style={{width: '100%'}}
      />
      <View style={styles.darkModeContainer}>
        <Text style={styles.darkModeText}>Dark mode</Text>
        <Switch
          trackColor={{
            false: colors['dark'].grey,
            true: colors['dark'].blue,
          }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor={colors['dark'].primary}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Separator
        dashColor={colors['dark'].grey}
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
