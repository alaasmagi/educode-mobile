import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginView from './app/screens/LoginView';
import SettingsView from './app/screens/SettingsView'
import {NavigationContainer}  from '@react-navigation/native';
import  {createStackNavigator}  from '@react-navigation/stack';
import * as ScreenCapture from 'expo-screen-capture';
import CreateAccountView from './app/screens/CreateAccountView';
import InitialSelectionView from './app/screens/InitialSelectionView';
import StudentMainView from './app/screens/StudentMainView';
import CompleteAttendanceView from './app/screens/CompleteAttendanceVIew';


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
        <Stack.Screen name="InitialSelectionView" component={InitialSelectionView} />
        <Stack.Screen name="LoginView" component={LoginView} />
        <Stack.Screen name="StudentMainView" component={StudentMainView} options={{ gestureEnabled: false }}/>
        <Stack.Screen name="SettingsView" component={SettingsView} />
        <Stack.Screen name="CompleteAttendanceView" component={CompleteAttendanceView} />
        <Stack.Screen name="CreateAccountView" component={CreateAccountView} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}