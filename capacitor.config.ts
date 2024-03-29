import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "uz.edumo.academy",
  appName: "Edumo Academy",
  webDir: "dist",
  bundledWebRuntime: false,
  cordova: {},
  plugins: {
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
      image: "resources/android/splash/icon.png",
      backgroundColor: "#ffffff",
      resizeMode: "cover"
    }
  }
};

export default config;
