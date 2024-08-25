import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SIgnUp} from '../screens/SIgnUp';
import {Login} from '../screens/Login';
import Home from '../screens/Home';

export type AuthStackParamList = {
  SIgnUp: undefined;
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SIgnUp" component={SIgnUp} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
