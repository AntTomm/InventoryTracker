// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0LHFEN4UZ04X4tRvlaF0Fk2SGcMw0D_k",
  authDomain: "inventory-management-b074a.firebaseapp.com",
  projectId: "inventory-management-b074a",
  storageBucket: "inventory-management-b074a.appspot.com",
  messagingSenderId: "632195746584",
  appId: "1:632195746584:web:cf4cbbdc0435df122dac6d",
  measurementId: "G-H3MFJ36WLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };