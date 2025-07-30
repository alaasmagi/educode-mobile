import { ColorValue } from "react-native";

export type AppTheme = {
  "app-bg-color": ColorValue;
  "button-bg-color": ColorValue;
  "card-bg-color": ColorValue;
  "default-font-color": ColorValue;
  "button-border-color": ColorValue
  "button-font-color": ColorValue,
  "border-color": ColorValue;
  "qr-generator-bg-color": ColorValue;
  "qr-generator-border-color": ColorValue;
};

export const DarkTheme: AppTheme = {
  "app-bg-color": "#343434",
  "button-bg-color": "#262626",
  "card-bg-color": "",
  "default-font-color": "#E8EEF1",
  "button-border-color": "#1977E2",
  "button-font-color": "#E8EEF1",
  "border-color": "#515151",
  "qr-generator-bg-color": "#E8EEF1",
  "qr-generator-border-color": "#515151",
};

export const LightTheme: AppTheme = {
  "app-bg-color": "#BCBCBD",
  "button-bg-color": "#1977E2",
  "card-bg-color": "",
  "default-font-color": "#262626",
  "button-border-color": "#262626",
  "button-font-color": "#E8EEF1",
  "border-color": "#E0E0E0",
  "qr-generator-bg-color": "#262626",
  "qr-generator-border-color": "#CCC",
};
