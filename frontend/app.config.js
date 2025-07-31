export default {
  expo: {
    name: "ResQ App",
    slug: "resq-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      supabaseUrl: "https://qlblrexwpmqprrmfynum.supabase.co",
      supabaseAnonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYmxyZXh3cG1xcHJybWZ5bnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1ODUsImV4cCI6MjA2OTU2NjU4NX0.aiIr0Gd6W_xvQukzaNMlbvj3ZKWZT4cDhhrCE6CzPsA",
    },
  },
};
