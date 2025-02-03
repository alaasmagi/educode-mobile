import React from 'react';
import { StatusBar } from 'expo-status-bar';
import InitialSelection from './app/screens/InitialSelection';
import LoginView from './app/screens/LoginView';
import MainView from './app/screens/MainView';
import CreateAccountView from './app/screens/CreateAccountView'
import SettingsView from './app/screens/SettingsView'
import {NavigationContainer}  from '@react-navigation/native';
import  {createStackNavigator}  from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style="light"/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialSelection" component={InitialSelection} />
        <Stack.Screen name="LoginView" component={LoginView} />
        <Stack.Screen name="MainView" component={MainView} />
        <Stack.Screen name="CreateAccountView" component={CreateAccountView} />
        <Stack.Screen name="SettingsView" component={SettingsView} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
