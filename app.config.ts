import "dotenv/config";

export default {
  expo: {
    name: "sistematizacao",
    slug: "sistematizacao",
    scheme: "sistematizacao",
    version: "1.0.0",
    userInterfaceStyle: "automatic",
    android: {
      package: "com.nina.sistematizacao", 
    },
    extra: {
      eas: {
    projectId: "c2cd3f68-f5b1-4ffc-b487-69e9e7dcb73a",
  },
      WEATHER_API_KEY: process.env.WEATHER_API_KEY || "FALLBACK_AQUI",
    },
  },
};
