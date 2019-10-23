import * as firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBbk64i-L4iYSTWhgpC0fUQ2pu_7DjijIs',
  authDomain: 'article-esiea.firebaseapp.com',
  databaseURL: 'https://article-esiea.firebaseio.com',
  projectId: 'article-esiea',
  storageBucket: 'article-esiea.appspot.com',
  messagingSenderId: '882002684137',
  appId: '1:882002684137:web:32ee63fffa8ecfc7a3e878',
  measurementId: 'G-QB7ZYPK603'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

export default db
