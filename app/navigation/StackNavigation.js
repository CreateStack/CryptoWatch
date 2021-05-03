import React from 'react';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import colors from '../config/colors';
import Portfolio from '../screens/Portfolio';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

function StackNavigation(props) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 56,
            backgroundColor: colors['dark'].primary,
          },
          headerTitleStyle: {
            color: colors['dark'].white,
            fontSize: 25,
          },
          headerTintColor: colors['dark'].white,
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
                color={colors['dark'].white}
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
              color: colors['dark'].white,
              fontSize: 25,
              marginLeft: -20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default StackNavigation;
