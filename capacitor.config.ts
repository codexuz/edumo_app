import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "vercel.multiexam.app",
  appName: "ExamOnline Edumo",
  webDir: "dist",
  bundledWebRuntime: false,
  cordova: {},
  plugins: {
     FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true
    }
  },
  ios: {
    splash: {
      image: "resources/android/splash/icon.png",
      backgroundColor: "#ffffff",
      resizeMode: "cover"
    }
  },
  android: {
    splash: {
      image: "resources/splash.png",
      backgroundColor: "#ffffff",
      resizeMode: "cover"
    }
  }
};

export default config;
