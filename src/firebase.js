
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDQyivGLw3gJN_iNACeza7VS2Ft--CEevM",
    authDomain: "bookshelf-nov182021.firebaseapp.com",
    projectId: "bookshelf-nov182021",
    storageBucket: "bookshelf-nov182021.appspot.com",
    messagingSenderId: "396628665539",
    appId: "1:396628665539:web:d76bcb31c4355321c96e76"
  };
  
firebase.initializeApp(firebaseConfig);

export default firebase;