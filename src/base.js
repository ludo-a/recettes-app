import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB90LBYXnKZO6IFdyHd7vLbigcX94gLZdU',
  authDomain: 'recettes-app-4892a.firebaseapp.com',
  databaseURL: 'https://recettes-app-4892a-default-rtdb.europe-west1.firebasedatabase.app'
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
