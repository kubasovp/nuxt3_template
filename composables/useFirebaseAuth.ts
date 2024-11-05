import { type Auth, type User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useUserStore } from '@/stores/user.store';

export default function () {
	const { $auth } = useNuxtApp();
	const user = useState<User | null>('fb_user', () => null);
	const userStore = useUserStore();

	const registerUser = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(<Auth>$auth, email, password);
			if (userCredential) {
				user.value = userCredential.user;
				userStore.setUser({
					isLogin: true,
					displayName: userCredential.user.displayName,
					email: userCredential.user.email,
					photoURL: userCredential.user.photoURL,
					emailVerified: userCredential.user.emailVerified,
					uid: userCredential.user.uid,
				});
				console.log('Регистрация прошла успешно');
				return { success: true };
			}
		}
		catch (error) {
			console.log('Ошибка регистрации:', error);
			return { success: false, message: 'Ошибка регистрации' };
		}
		return { success: false, message: 'Неизвестная ошибка' };
	};

	const signUser = async (email: string, password: string): Promise<{
		success: boolean;
		data?: object | null;
		message?: string;
	}> => {
		try {
			const userCredential = await signInWithEmailAndPassword(<Auth>$auth, email, password);
			if (userCredential) {
				user.value = userCredential.user;
				userStore.setUser({
					isLogin: true,
					displayName: userCredential.user.displayName,
					email: userCredential.user.email,
					photoURL: userCredential.user.photoURL,
					emailVerified: userCredential.user.emailVerified,
					uid: userCredential.user.uid,
				});
				return { success: true, data: userCredential };
			}
		}
		catch (error) {
			console.log('Ошибка входа:', error);
			return { success: false, message: 'Ошибка входа' };
		}
		return { success: false, message: 'Неизвестная ошибка' };
	};

	const userSignOut = async (): Promise<{ success: boolean; message?: string }> => {
		try {
			await signOut(<Auth>$auth);
			userStore.clearUser();
			console.log('Выход успешен');
			return { success: true };
		}
		catch (error) {
			console.log('Ошибка выхода:', error);
			return { success: false, message: 'Ошибка выхода' };
		}
	};

	return {
		user,
		registerUser,
		signUser,
		userSignOut,
	};
}
