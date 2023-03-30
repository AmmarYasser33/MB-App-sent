import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const DB_KEY = await getDBKey();

const firebaseConfig = {
  apiKey: `${DB_KEY}`,
  authDomain: "node-firebase-2aa6f.firebaseapp.com",
  databaseURL: "https://node-firebase-2aa6f-default-rtdb.firebaseio.com",
  projectId: "node-firebase-2aa6f",
  storageBucket: "node-firebase-2aa6f.appspot.com",
  messagingSenderId: "496787265106",
  appId: "1:496787265106:web:1368add1e720d87389318b",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

async function getDBKey() {
  const res = await fetch("/api/return/dbkey");
  const data = await res.json();

  return data.data;
}
