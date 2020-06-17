import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

  var config = {
    apiKey: "AIzaSyC-bGicewG2M8-MX-r7vmoqQCri8-zdrmM",
    authDomain: "recipe-app-87986.firebaseapp.com",
    databaseURL: "https://recipe-app-87986.firebaseio.com",
    projectId: "recipe-app-87986",
    storageBucket: "recipe-app-87986.appspot.com",
    messagingSenderId: "682791700917"
  };
  firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
