export default {
  expo: {
    name: "EduCode",
    slug: "educode-mobile",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    splash: {
      image: "./app/assets/logos/splash-logo.png",
      resizeMode: "contain",
      backgroundColor: "#2B2B2B",
    },
    androidNavigationBar: {
      barStyle: "light-content",
      backgroundColor: "#2B2B2B",
    },
    ios: {
      supportsTablet: true,
      icon: "./app/assets/logos/app-icon.png",
      bundleIdentifier: "com.educode.mobile",
    },
    android: {
      package: "com.educode.mobile",
      adaptiveIcon: {
        foregroundImage: "./app/assets/logos/app-icon.png",
        backgroundColor: "#2B2B2B",
      },
      permissions: ["android.permission.CAMERA"],
    },
    web: {
      favicon: "./app/assets/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          recordAudioAndroid: false,
        },
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#2B2B2B",
          image: "./app/assets/logos/splash-logo.png",
          imageWidth: 200,
        },
      ],
    ],
    extra: {
      router: {
        origin: false,
      },
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL ?? "https://educode.share.zrok.io/",
      EXPO_PUBLIC_EMAILDOMAIN: process.env.EXPO_PUBLIC_EMAILDOMAIN ?? "@taltech.ee",
      eas: {
        projectId: "6a2ef7e1-936b-4005-a953-e2d4393bf9dd",
      },
    },
  },
};
