import 'dotenv/config';

export default {
  ios: {
    config: {
      googleSignIn: {
        reservedClientId: process.env.IOS_URL_SCHEME
      }
    }
  },
  extra: {
    iOsClientId: process.env.IOS_CLIENT_ID,
    androidClientId: process.env.ANDROID_CLIENT_ID,
    fallBackCard: {
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        size: 3
      }
    }
  },
};
