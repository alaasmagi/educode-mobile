import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';

const ScreenCaptureHandler = (clearSensitiveData: () => void) => {
    useEffect(() => {
        const preventCapture = async () => {
            await ScreenCapture.preventScreenCaptureAsync();
        };

        preventCapture();

        const screenshotListener = Platform.OS === 'ios'
            ? ScreenCapture.addScreenshotListener(() => {
                Alert.alert("Screenshot detected!", "Sensitive data will be cleared.");
                clearSensitiveData();
            })
            : null;

        return () => {
            ScreenCapture.allowScreenCaptureAsync();
            screenshotListener?.remove();
        };
    }, []);
};

export default ScreenCaptureHandler;
