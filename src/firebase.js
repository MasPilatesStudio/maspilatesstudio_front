// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDdYHz3ypA6azGAQi3d2NwbZjhXLtCQAd0',
  authDomain: 'maspilates-e9406.firebaseapp.com',
  projectId: 'maspilates-e9406',
  storageBucket: 'maspilates-e9406.appspot.com',
  messagingSenderId: '700613235420',
  appId: '1:700613235420:web:7fbdf9ae02df05caaf5a19',
  measurementId: 'G-0HEBS5TLS7'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = ref(getStorage(app))
// const analytics = getAnalytics(app)
export default storage
