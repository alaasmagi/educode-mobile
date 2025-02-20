import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import InitialSelection from './app/screens/InitialSelection';
import LoginView from './app/screens/LoginView';
import StudentQRScan from './app/screens/StudentQRScan';
import SettingsView from './app/screens/SettingsView'
import {NavigationContainer}  from '@react-navigation/native';
import  {createStackNavigator}  from '@react-navigation/stack';
import CompleteAttendance from './app/screens/CompleteAttendance';
import * as ScreenCapture from 'expo-screen-capture';


const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    const preventCapture = async () => {
        await ScreenCapture.preventScreenCaptureAsync();
    };

    preventCapture();

    return () => {
        ScreenCapture.allowScreenCaptureAsync();
    };
}, []);

  return (
    <>
    <StatusBar style="light"/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialSelection" component={InitialSelection} />
        <Stack.Screen name="LoginView" component={LoginView} />
        <Stack.Screen name="StudentQRScan" component={StudentQRScan} options={{ gestureEnabled: false }}/>
        <Stack.Screen name="SettingsView" component={SettingsView} />
        <Stack.Screen name="CompleteAttendance" component={CompleteAttendance} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}