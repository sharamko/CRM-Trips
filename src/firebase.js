import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

export const app = initializeApp({
  apiKey: 'AIzaSyB-wS9wuIE81QiXWg2yzgHO7ZWQ8vZ1tO0',
  authDomain: 'test-task-44ff8.firebaseapp.com',
  projectId: 'test-task-44ff8',
  storageBucket: 'test-task-44ff8.appspot.com',
  messagingSenderId: '581039318906',
  appId: '1:581039318906:web:f40196ac926e9826d2d8c3',
});

export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
