import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCPjNN4r6MVNZ7DXi_0pgEcqkftPQkocgE",
    authDomain: "todo-list-5dd8c.firebaseapp.com",
    databaseURL: "https://todo-list-5dd8c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todo-list-5dd8c",
    storageBucket: "todo-list-5dd8c.appspot.com",
    messagingSenderId: "964835079683",
    appId: "1:964835079683:web:205689f062fbc9ac4f4036"
});

export {
    firebaseConfig as firebase
};