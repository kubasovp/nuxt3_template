import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
	const firebaseConfig = {
		apiKey: 'AIzaSyAylZ5F-8x8ohF7Sx22H3_pKsaMESrxEXY',
		authDomain: 'xtray-nuxt3.firebaseapp.com',
		projectId: 'xtray-nuxt3',
		storageBucket: 'xtray-nuxt3.appspot.com',
		messagingSenderId: '879117160994',
		appId: '1:879117160994:web:dd41e9c564a8232305307b',
	};

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const firestore = getFirestore(app);

	nuxtApp.vueApp.provide('auth', auth);
	nuxtApp.provide('auth', auth);

	nuxtApp.vueApp.provide('firestore', firestore);
	nuxtApp.provide('firestore', firestore);
});

// proof https://medium.com/codex/using-firebase-in-nuxt3-the-right-way-bebbb6d8c4dd
