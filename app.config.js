export default {
    expo: {
      name: "EduCode",
      slug: "educode-mobile",
      splash: {
        image: "./app/assets/logos/splash-logo.png",
        resizeMode: "contain",
        backgroundColor: "#2B2B2B"
      },
    android: {
        package: "com.educode.mobile"
    },
    extra: {
        eas: {
            projectId: "6a2ef7e1-936b-4005-a953-e2d4393bf9dd"
        },
        EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || "https://educode.share.zrok.io/"
      },
    },
  };