import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCbXcKLfM3AmUf85A0m1JD4EanD4dyhRIE",
  authDomain: "crwn-db-d1903.firebaseapp.com",
  databaseURL: "https://crwn-db-d1903.firebaseio.com",
  projectId: "crwn-db-d1903",
  storageBucket: "",
  messagingSenderId: "154808674570",
  appId: "1:154808674570:web:17574ef4a7671c71"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase