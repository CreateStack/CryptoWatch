import React from 'react';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import colors from '../config/colors';
import Portfolio from '../screens/Portfolio';
import Settings from '../screens/Settings';
import EditCurrency from '../component/EditCurrency';
import useStore from '../store/useStore';

const Stack = createStackNavigator();

function StackNavigation(props) {
  const {getState, subscribeStore} = useStore();
  const [darkMode, setDarkMode] = React.useState(getState().crypto.darkMode);
  const theme = darkMode ? 'dark' : 'light';
  let unSubscribe = subscribeStore(async () => {
    setDarkMode(await getState().crypto.darkMode);
  });
  React.useEffect(() => {
    return () => unSubscribe();
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 56,
            backgroundColor: colors[theme].tertiary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: colors[theme].white,
            fontSize: 22,
          },
          headerTintColor: colors[theme].white,
        }}
        headerMode="screen"
        initialRouteName={'Portfolio'}>
        <Stack.Screen
          name="Portfolio"
          component={Portfolio}
          options={({navigation}) => ({
            headerRight: () => (
              <Icon
                size={24}
                color={colors[theme].white}
                name="gear"
                onPress={() => navigation.navigate('Settings')}
                style={{padding: 16}}
              />
            ),
            title: 'Crypto portfolio',
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings',
            headerTitleStyle: {
              color: colors[theme].white,
              fontSize: 22,
              marginLeft: -20,
            },
            headerStyle: {
              backgroundColor: colors[theme].primary,
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="EditCurrency"
          component={EditCurrency}
          options={{
            headerTitleStyle: {
              color: colors[theme].white,
              fontSize: 22,
              marginLeft: -20,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerStyle: {
              backgroundColor: colors[theme].primary,
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default StackNavigation;
