import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import InitialSelection from './app/screens/InitialSelection';
import LoginView from './app/screens/LoginView';
import QRBoardScan from './app/screens/QRBoardScan';
import CreateAccountView from './app/screens/CreateAccountView'
import SettingsView from './app/screens/SettingsView'
import {NavigationContainer}  from '@react-navigation/native';
import  {createStackNavigator}  from '@react-navigation/stack';
import { SplashScreen } from 'expo-router';
import QRWorkplaceScan from './app/screens/QRWorkplaceScan';
import CompleteAttendance from './app/screens/CompleteAttendance';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function App() {
  useEffect(() => {
    checkAPIConnection();
  }, []);

  const checkAPIConnection = async () => {

  const response = await fetch(API_URL);
    if (response.ok) {
      setTimeout(() => SplashScreen.hideAsync(), 3000);
    } else {
      throw new Error("Server error");
    }
  };

  return (
    <>
    <StatusBar style="light"/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialSelection" component={InitialSelection} />
        <Stack.Screen name="LoginView" component={LoginView} />
        <Stack.Screen name="QRBoardScan" component={QRBoardScan} />
        <Stack.Screen name="QRWorkplaceScan" component={QRWorkplaceScan} />
        <Stack.Screen name="CreateAccountView" component={CreateAccountView} />
        <Stack.Screen name="SettingsView" component={SettingsView} />
        <Stack.Screen name="CompleteAttendance" component={CompleteAttendance} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}