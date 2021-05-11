import React, {useRef, useState, useEffect} from 'react';
import {AppState} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import colors from '../config/colors';
import Portfolio from '../screens/Portfolio';
import {ms, s, vs} from '../util/scale';
import Settings from '../screens/Settings';
import EditCurrency from '../component/EditCurrency';
import useStore from '../store/useStore';
import ApiKeyGeneration from '../screens/ApiKeyGeneration';

const Stack = createStackNavigator();

function StackNavigation(props) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  const {connectWs, disconnectWs, getState, subscribeStore} = useStore();
  const [darkMode, setDarkMode] = React.useState(getState().crypto.darkMode);
  const [currency, setCurrency] = React.useState(getState().crypto.currency);
  const theme = darkMode ? 'dark' : 'light';
  let unSubscribe = subscribeStore(async () => {
    setDarkMode(await getState().crypto.darkMode);
    setCurrency(await getState().crypto.currency);
  });
  React.useEffect(() => {
    if (appStateVisible === 'active') connectWs();
    else disconnectWs();
    return () => unSubscribe();
  }, [appStateVisible]);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: vs(56),
            backgroundColor: colors[theme].tertiary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: colors[theme].white,
            fontSize: ms(22),
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
                size={s(24)}
                color={colors[theme].white}
                name="gear"
                onPress={() => navigation.navigate('Settings')}
                style={{padding: 16}}
              />
            ),
            title: 'Crypto portfolio (' + (currency === 'USD' ? '$)' : '₹)'),
          })}
          initialParams={{usdInr: props.usdInr}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings',
            headerTitleStyle: {
              color: colors[theme].white,
              fontSize: ms(22),
              marginLeft: s(-20),
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
            title: 'Edit currency',
            headerTitleStyle: {
              color: colors[theme].white,
              fontSize: ms(22),
              marginLeft: s(-20),
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
        <Stack.Screen
          name="ApiKeyGeneration"
          component={ApiKeyGeneration}
          options={{
            title: 'API Key',
            headerTitleStyle: {
              color: colors[theme].white,
              fontSize: ms(22),
              marginLeft: s(-20),
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

export default StackNavigation;
