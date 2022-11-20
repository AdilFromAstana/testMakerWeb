import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC5O9UOzIvIL1ekBEPnboTCYg-kp0AlANY",
  authDomain: "test-task-2a7d3.firebaseapp.com",
  projectId: "test-task-2a7d3",
  storageBucket: "test-task-2a7d3.appspot.com",
  messagingSenderId: "76766177650",
  appId: "1:76766177650:web:05d8b0807bd221562755eb",
  measurementId: "G-S4MJWH05J2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);