export type ENVConfig = {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  cloudinary: {
    cloudinaryName: string;
    cloudinaryApiKey: string;
    cloudinaryApiSecret: string;
  };
};
