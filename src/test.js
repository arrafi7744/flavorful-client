// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAX-V7xivV8S_-3iWUNCxEqXaNP6Weq9GA',
  authDomain: 'flavorfulfusion-client.firebaseapp.com',
  projectId: 'flavorfulfusion-client',
  storageBucket: 'flavorfulfusion-client.firebasestorage.app',
  messagingSenderId: '942566554652',
  appId: '1:942566554652:web:22096c63ec9eeeb937f3d9',
  measurementId: 'G-HMH2D7YM1T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//project-942566554652
