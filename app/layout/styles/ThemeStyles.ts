import { ColorValue } from "react-native";

export type AppTheme = {
  "darkgrey-white": ColorValue;
  "black-blue": ColorValue;
  "black-white": ColorValue;
  "default-font-color": ColorValue;
  "default-border-color": ColorValue;
  "button-font-color": ColorValue;
  "default-icon-color": ColorValue;
  "border-color": ColorValue;
  "qr-generator-bg-color": ColorValue;
  "qr-generator-border-color": ColorValue;
  "default-placeholder-color": ColorValue;
    "default-blue": ColorValue;
    "default-white": ColorValue
};

export const DarkTheme: AppTheme = {
  "darkgrey-white": "#343434",
  "black-blue": "#262626",
  "black-white": "#262626",
  "default-font-color": "#E8EEF1",
  "default-border-color": "#1977E2",
  "button-font-color": "#E8EEF1",
  "default-icon-color": "#E8EEF1",
  "border-color": "#515151",
  "qr-generator-bg-color": "#E8EEF1",
  "qr-generator-border-color": "#515151",
  "default-placeholder-color": "#BCBCBD",
  "default-blue":"#1977E2",
  "default-white":"#E8EEF1"

};

export const LightTheme: AppTheme = {
  "darkgrey-white": "#E8EEF1",
  "black-blue": "#1977E2",
  "black-white": "#E8EEF1",
  "default-font-color": "#262626",
  "default-border-color": "#262626",
  "default-icon-color": "#262626",
  "button-font-color": "#E8EEF1",
  "border-color": "#E0E0E0",
  "qr-generator-bg-color": "#262626",
  "qr-generator-border-color": "#FFFFFF",
  "default-placeholder-color": "#696969",
    "default-blue":"#1977E2",
      "default-white":"#E8EEF1"

};
