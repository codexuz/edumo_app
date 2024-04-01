import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "uz.edumo.academy",
  appName: "Edumo Academy",
  webDir: "dist",
  bundledWebRuntime: false,
  cordova: {},
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '286062618284-cpte93ftno07vvadmfo3tr3617i1tj0j.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    CapacitorHttp: {
      enabled: true,
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
      image: "resources/android/splash/icon.png",
      backgroundColor: "#ffffff",
      resizeMode: "cover"
    }
  }
};

export default config;
