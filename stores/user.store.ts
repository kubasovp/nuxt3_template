import type { CurrentUser } from '@/types/types'

const CurrentUser: { user: CurrentUser } = {
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
	state: () => CurrentUser,
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
			this.$patch(CurrentUser)
		},
	},
})
