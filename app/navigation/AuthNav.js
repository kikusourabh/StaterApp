import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createStackNavigator();

function AuthNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Registration" component={Register}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNav;
