import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import useRequest from './APIServices/useRequest';
import axios from 'axios';

// Firebase configuration (use the values from your Firebase project)
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    // Send user info to your backend for account creation/management

    const res = axios.post(
      `${process.env.REACT_APP_BackendURL}//users/crt/bygl`,
      {
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
        token,
      }
    );
    console.log('res', res.data.data);
  } catch (error) {
    console.error('Error during Google login:', error);
  }
};
export { auth, provider };
