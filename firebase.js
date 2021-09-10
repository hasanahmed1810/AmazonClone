import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDBB0TPw0WvwU86dRZ2w55QIYNXMFS6qFA",
    authDomain: "clone-51ce4.firebaseapp.com",
    projectId: "clone-51ce4",
    storageBucket: "clone-51ce4.appspot.com",
    messagingSenderId: "1001516770879",
    appId: "1:1001516770879:web:3ae570a12b6b67509d7a8a"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

  const db = app.firestore()

  export default db