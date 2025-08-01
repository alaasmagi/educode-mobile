import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import LoginView from "./app/screens/LoginView";
import SettingsView from "./app/screens/SettingsView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountView from "./app/screens/CreateAccountView";
import InitialSelectionView from "./app/screens/InitialSelectionView";
import StudentMainView from "./app/screens/StudentMainView";
import CompleteAttendanceView from "./app/screens/CompleteAttendanceVIew";
import TeacherMainView from "./app/screens/TeacherMainView";
import ForgotPasswordView from "./app/screens/ForgotPasswordView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { ApplyStyles } from "./app/businesslogic/hooks/SelectAppTheme";
import { EAppTheme } from "./app/models/EAppTheme";

const Stack = createStackNavigator();

export default function App() {
  const {appTheme} = ApplyStyles();
  const [fontsLoaded] = useFonts({
    "Nunito-normal": require("./app/assets/fonts/Nunito-normal.ttf"),
    "Roboto-normal": require("./app/assets/fonts/Roboto-normal.ttf"),
    "Nunito-bold": require("./app/assets/fonts/Nunito-bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <SafeAreaProvider>
        <StatusBar style={appTheme === EAppTheme.Light ? "dark" : "light"} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InitialSelectionView" component={InitialSelectionView} />
            <Stack.Screen name="LoginView" component={LoginView} options={{ gestureEnabled: false }} />
            <Stack.Screen name="StudentMainView" component={StudentMainView} options={{ gestureEnabled: false }} />
            <Stack.Screen name="SettingsView" component={SettingsView} options={{ gestureEnabled: false }} />
            <Stack.Screen name="CompleteAttendanceView" component={CompleteAttendanceView} />
            <Stack.Screen name="CreateAccountView" component={CreateAccountView} />
            <Stack.Screen name="TeacherMainView" component={TeacherMainView} />
            <Stack.Screen name="ForgotPasswordView" component={ForgotPasswordView} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
