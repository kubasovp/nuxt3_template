import {
	signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,
	onAuthStateChanged, signOut, type User, type Auth
} from 'firebase/auth'

export default function() {
	const { $auth } = useNuxtApp();
	const user = useState<User | null>("fb_user", () => null)

	const registerUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(<Auth>$auth, email, password);
			if (userCredential) {
				user.value = userCredential.user;
				console.log('Регистрация прошла успешно');
				return true;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Ошибка регистрации:', error);
			}
			return false;
		}
		return false;
	}

	const signUser = async (email: string, password: string): Promise<object | boolean> => {
		try {
			const userCredential = await signInWithEmailAndPassword(<Auth>$auth, email, password);
			if (userCredential) {
				user.value = userCredential.user;
				console.log('Вход успешен:', userCredential.user.email);
				return userCredential;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Ошибка входа:', error);
			}
			return false;
		}
		return false;
	}

	const getUserState = async (): Promise<boolean> => {
		try {
			onAuthStateChanged(<Auth>$auth, (user) => {
				if (user) {
					console.log('Авторизованный пользователь', user.email);
					return true;
				} else {
					console.log('Вы не вошли');
				}
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('не удалось получить данные пользователя', error);
			}
			return false;
		}
		return false;
	}

	const userSignOut = async (): Promise<object | boolean> => {
		try {
			await signOut(<Auth>$auth);
			console.log('Выход успешен');
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Ошибка выхода:', error);
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