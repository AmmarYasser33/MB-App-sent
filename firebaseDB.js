const { getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "" + process.env.FIREBASE_API_KEY,
  authDomain: "node-firebase-2aa6f.firebaseapp.com",
  projectId: "node-firebase-2aa6f",
  storageBucket: "node-firebase-2aa6f.appspot.com",
  messagingSenderId: "496787265106",
  appId: "1:496787265106:web:1368add1e720d87389318b",
  databaseURL: "https://node-firebase-2aa6f-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

module.exports = {
  auth,
  db,
};
