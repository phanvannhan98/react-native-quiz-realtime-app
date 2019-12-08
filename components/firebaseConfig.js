import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCNpbNd3O_1vo50eInktNYyR2IvGnIp0KA",
    authDomain: "quizdanceapp.firebaseapp.com",
    databaseURL: "https://quizdanceapp.firebaseio.com",
    projectId: "quizdanceapp",
    storageBucket: "quizdanceapp.appspot.com",
    messagingSenderId: "200378895079",
    appId: "1:200378895079:web:d634db51f79198dedcf042",
    measurementId: "G-YPD3JRGWBS"
  };
  // Initialize Firebase
  
 export const firebaseApp = firebase.initializeApp(firebaseConfig);

