import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User} from 'firebase/auth'

export default function() {
	const { $auth } = useNuxtApp()

	const user = useState<User | null>("fb_user", () => null)

	const registerUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const userCreds = await createUserWithEmailAndPassword($auth, email, password);
			if (userCreds) {
				user.value = userCreds.user
				console.log('Регистрация прошла успешно')
				return true
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				// handle error
				console.log('Ошибка регистрации:', error)
			}
			return false
		}
		return false
	}

	const signUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const userCredential = await signInWithEmailAndPassword($auth, email, password);
			if (userCredential) {
				user.value = userCredential.user
				console.log('Вход успешен:', userCredential.user)
				return true
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				// handle error
				console.log('Ошибка входа:', error)
			}
			return false
		}
		return false
	}

	// const signUser = signInWithEmailAndPassword($auth, email: string, password: string)
	// 		.then((userCredential) => {
	// 			// Signed in
	// 			console.log('Регистрация прошла успешно:', userCredential.user)
	// 			const user = userCredential.user;
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			const errorCode = error.code;
	// 			const errorMessage = error.message;
	// 			console.log('Ошибка входа:', error)
	// 		});

	return {
		user,
		registerUser,
		signUser
	}
}