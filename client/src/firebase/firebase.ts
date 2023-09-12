import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getDatabase,
  push,
  ref,
  set,
  get,
  update,
  remove,
  onValue,
  query,
  equalTo,
  orderByChild,
  child,
  off
} from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBv9jyohwRvAIulgjlBHW2IoVP05f07p2k',
  authDomain: 'portfoli-fy-v2.firebaseapp.com',
  projectId: 'portfoli-fy-v2',
  storageBucket: 'portfoli-fy-v2.appspot.com',
  messagingSenderId: '36185347665',
  appId: '1:36185347665:web:bf9258a3f3a716a74e0a70',
  measurementId: 'G-NCBR273RWX'
}

const app = initializeApp(firebaseConfig)

const auth = getAuth()
const database = getDatabase(app)

export {
  app,
  auth,
  database,
  push,
  ref,
  set,
  get,
  update,
  remove,
  query,
  equalTo,
  child,
  orderByChild,
  onValue,
  off,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}
