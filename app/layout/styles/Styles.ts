import { ColorValue } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppTheme } from "./ThemeStyles";

export function Styles(theme: AppTheme) {
  return {
    "normal-font-color": "#E8EEF1" as ColorValue,
    "normal-icon-color": "#E8EEF1" as ColorValue,
    "normal-card-bg-color": "" as ColorValue,

    "normal-icon-size": 32,
    "l-icon-size": "",

    "normal-button-font-size": 26,
    "l-font-size": "",
    "xl-font-size": "",
    "s-font-size": "",

    "normal-button-bg-color": "#262626" as ColorValue,
    "normal-button-border-radius": 20,
    "normal-button-border-thickness": 2,
    "normal-button-border-color": "#1977E2" as ColorValue,

    "textbox-border-thickness": 1,
    "textbox-border-color": "#E8EEF1" as ColorValue,
    "textbox-font-color": "#E8EEF1" as ColorValue,
    "textbox-font-size": 20,
    "textbox-active-border-color": "#1977E2" as ColorValue,
    "textbox-border-radius": 15,
    "textbox-icon-color": "#E8EEF1" as ColorValue,
    "textbox-icon-size": 28,
    "textbox-icon-thickness": 2,
    "textbox-placeholder-color": "#BCBCBD" as ColorValue,

    // Message card styles
    "message-card-icon-thickness": 2,
    "message-card-icon-size": 36,
    "message-card-border-radius": 20,
    "message-card-border-thickness": 2,
    "message-card-font-size": 20,

    "alert-font-color": "#DD2D4A" as ColorValue,
    "info-font-color": "#4C97FF" as ColorValue,
    "success-font-color": "#2DD452" as ColorValue,

    "alert-icon-color": "#DD2D4A" as ColorValue,
    "info-icon-color": "#4C97FF" as ColorValue,
    "success-icon-color": "#2DD452" as ColorValue,

    "alert-card-bg-color": "#3F1E20" as ColorValue,
    "info-card-bg-color": "#16325B" as ColorValue,
    "success-card-bg-color": "#1E3F20" as ColorValue,
    "normal-card-border-color": "" as ColorValue,
    "alert-card-border-color": "#DD2D4A" as ColorValue,
    "info-card-border-color": "#4C97FF" as ColorValue,
    "success-card-border-color": "#2DD452" as ColorValue,

    "normal-border-thickness": 2,
    "wide-border-thickness": "",
    "narrow-border-thickness": "",

    "normal-icon-thickness": 2,
    "wide-icon-thickness": "",

    // QR code styles
    "normal-qr-border-color": "" as ColorValue,
    "alert-qr-border-color": "" as ColorValue,
    "success-qr-border-color": "" as ColorValue,

    "data-text-font-size": wp("5%"),
    "data-text-font-color": "#E8EEF1" as ColorValue,

    "normal-link-font-size": wp("4.5%"),
    "normal-link-font-color": "#E8EEF1" as ColorValue,

    "checkbox-size": 30,
    "checkbox-bg-color": "#262626" as ColorValue,
    "checkbox-border-radius": 8,
    "checkbox-border-thickness": 2,
    "checkbox-border-color": "#1977E2" as ColorValue,
    "checkbox-inner-size": 17,
    "checkbox-inner-radius": 3,
    "checkbox-inner-bg-color": "#1977E2" as ColorValue,
    "checkbox-font-color": "#E8EEF1" as ColorValue,
    "checkbox-font-size": wp("4.5%"),

    "greeting-font-color": "#E8EEF1" as ColorValue,
    "greeting-font-size": wp("7.8%"),

    "mode-toggle-border-radius": 20,
    "mode-toggle-bg-color": "#525252" as ColorValue,
    "mode-toggle-option-border-radius": 20,
    "mode-toggle-selected-bg-color": "#262626" as ColorValue,
    "mode-toggle-selected-border-color": "#1977E2" as ColorValue,
    "mode-toggle-selected-border-thickness": 2,
    "mode-toggle-font-color": "#E8EEF1" as ColorValue,
    "mode-toggle-font-size": wp("6%"),

    "qr-generator-size": hp("32%"),
    "qr-generator-border-radius": wp("8%"),
    "qr-generator-border-thickness": wp("4%"),
    "qr-generator-border-color": "#515151" as ColorValue,
    "qr-generator-bg-color": "#E8EEF1" as ColorValue,
    "qr-generator-enlarged-size": hp("42%"),

    "qr-scanner-camera-border-radius": wp("8%"),
    "qr-scanner-camera-border-normal-color": "#515151" as ColorValue,
    "qr-scanner-camera-border-success-color": "#2DD452" as ColorValue,
    "qr-scanner-camera-border-alert-color": "#DD2D4A" as ColorValue,
    "qr-scanner-camera-border-width": wp("4%"),
    "qr-scanner-font-color": "#E8EEF1" as ColorValue,
    "qr-scanner-font-size": wp("6%"),
    "qr-scanner-icon-size": 36,
    "qr-scanner-icon-color": "#E8EEF1" as ColorValue,
    "qr-scanner-icon-thickness": 2,

    "separator-line-thickness": 1,
    "separator-line-color": "#E8EEF1" as ColorValue,
    "separator-line-font-color": "#E8EEF1" as ColorValue,
    "separator-line-font-size": wp("4%"),

    "settings-button-bg-color": "#262626" as ColorValue,
    "settings-button-border-radius": 20,
    "settings-button-border-thickness": 2,
    "settings-button-border-color": "#1977E2" as ColorValue,

    "settings-button-icon-size": 32,
    "settings-button-icon-color": "#E8EEF1" as ColorValue,
    "settings-button-icon-thickness": 2,

    "step-divider-circle-width": wp("10%"),
    "step-divider-circle-height": hp("3.5%"),
    "step-divider-border-radius": wp("3%"),
    "step-divider-border-color": "#1977E2" as ColorValue,
    "step-divider-border-thickness": 2,
    "step-divider-bg-color": "#262626" as ColorValue,
    "step-divider-font-size": wp("4.5%"),
    "step-divider-font-color": "#E8EEF1" as ColorValue,

    "underline-text-font-color": "#E8EEF1" as ColorValue,
    "underline-text-font-size": 25,
  };
}
