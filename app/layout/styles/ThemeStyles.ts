import { ColorValue } from "react-native";

export type AppTheme = {
  "app-bg-color": ColorValue;
  "default-bg-color": ColorValue;
  "card-bg-color": ColorValue;
  "default-font-color": ColorValue;
  "primary-color": ColorValue;
  "border-color": ColorValue;
  "qr-generator-bg-color": ColorValue;
  "qr-generator-border-color": ColorValue;
};

export const DarkTheme: AppTheme = {
  "app-bg-color": "#343434",
  "default-bg-color": "#262626",
  "card-bg-color": "",
  "default-font-color": "#E8EEF1",
  "primary-color": "#1977E2",
  "border-color": "#515151",
  "qr-generator-bg-color": "#E8EEF1",
  "qr-generator-border-color": "#515151",
};

export const LightTheme: AppTheme = {
  "app-bg-color": "#E8EEF1",
  "default-bg-color": "#F8F8F8",
  "card-bg-color": "",
  "default-font-color": "#262626",
  "primary-color": "#1977E2",
  "border-color": "#E0E0E0",
  "qr-generator-bg-color": "#262626",
  "qr-generator-border-color": "#CCC",
};
