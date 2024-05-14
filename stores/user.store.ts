interface currentUser {
	isLogin: boolean
	displayName: string
	email: string
	photoURL: string
	emailVerified: boolean
	uid: string
}

const defaultUser: { user: currentUser } = {
	user: {
		isLogin: false,
		displayName: '',
		email: '',
		photoURL: '',
		emailVerified: false,
		uid: '',
	},
}

export const useUserStore = defineStore('user', {
	state: () => defaultUser,
	getters: {
		isLogin: (state) => {
			return state.user.isLogin
		},
		email: (state) => {
			return state.user.email
		},
	},
	actions: {
		setUser(input: object) {
			this.$patch({ user: input })
		},
		clearUser() {
			this.$patch(defaultUser)
		},
	},
})
