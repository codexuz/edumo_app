import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "vercel.multiexam.app",
  appName: "ExamOnline Edumo",
  webDir: "dist",
  bundledWebRuntime: false,
  cordova: {},
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '813791000692-6488u36qrqik4gnh0tklsihmmsdqbor5.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
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
      image: "resources/splash/splash.png",
      backgroundColor: "#ffffff",
      resizeMode: "cover"
    }
  },
  android: {
    splash: {
      image: "resources/splash/splash.png",
      backgroundColor: "#ffffff",
      resizeMode: "cover"
    }
  }
};

export default config;
