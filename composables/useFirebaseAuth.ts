import {
	signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,
	onAuthStateChanged, signOut, type User, type Auth
} from 'firebase/auth'

export default function() {
	const { $auth } = useNuxtApp();
	const user = useState<User | null>("fb_user", () => null)

	const userSignOut = async (): Promise<object | boolean> => {
		try {
			await signOut(<Auth>$auth);
			// if (userCredential) {
			console.log('Выход успешен:');
			return {};
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Ошибка выхода:', error);
			}
			return false;
		}
		return false;
	}

	const getUserState = async (): Promise<boolean> => {
		onAuthStateChanged(<Auth>$auth, (user) => {
			if (user) {
				console.log('getUserState', user);
				console.log('getUserState user.uid', user.uid);
				return true;
			}
			return false;
		});
	}

	const registerUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const userCredential = await createUserWithEmailAndPassword($auth, email, password);
			if (userCredential) {
				user.value = userCredential.user
				console.log('Регистрация прошла успешно');
				return true;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Ошибка регистрации:', error);
			}
			return false
		}
		return false
	}

	const signUser = async (email: string, password: string): Promise<object | boolean> => {
		try {
			const userCredential = await signInWithEmailAndPassword($auth, email, password);
			if (userCredential) {
				user.value = userCredential.user
				console.log('Вход успешен:', userCredential.user)
				return userCredential;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Ошибка входа:', error)
			}
			return false;
		}
		return false;
	}

	return {
		user,
		registerUser,
		signUser,
		getUserState,
		userSignOut

	}
}