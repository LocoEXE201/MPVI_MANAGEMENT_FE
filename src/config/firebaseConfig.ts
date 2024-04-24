import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref as refStorage, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { serverTimestamp } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDq65LMWJhQWkkfVc_byHBnKUiHF0yTrLY",
  authDomain: "loveconnection-c9e41.firebaseapp.com",
  projectId: "loveconnection-c9e41",
  storageBucket: "loveconnection-c9e41.appspot.com",
  messagingSenderId: "866254596950",
  appId: "1:866254596950:web:51e44d4136b21fd2d904f7",
  measurementId: "G-EC1VD85K01",
  databaseURL: "https://loveconnection-c9e41-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
export const firebaseStorage = getStorage(app);
const database = getDatabase(app);
export { database, ref, push, onValue, serverTimestamp, uploadBytes, listAll, getDownloadURL, refStorage, deleteObject };
