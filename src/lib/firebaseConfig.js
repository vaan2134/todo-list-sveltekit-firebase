import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCH4RVMP1fkZNryOFA8V1LLi0zI44wUn3g',
	authDomain: 'blog-app-project-8f02b.firebaseapp.com',
	projectId: 'blog-app-project-8f02b',
	storageBucket: 'blog-app-project-8f02b.appspot.com',
	messagingSenderId: '345987096626',
	appId: '1:345987096626:web:cc55044bcb92ca7a6f5c2b'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
