import { defineStore } from 'pinia'

interface User {
	uid: string
	displayName: string
	email: string
	photoURL: string
	emailVerified: boolean
}

interface State {
	currentUser: User | null
}

export const useUserStore = defineStore('user', {
	state: (): State => ({
		currentUser: null,
	}),
	actions: {
		setUser(user: User) {
			this.currentUser = user
		},
		clearUser() {
			this.currentUser = null
		},
	},
})
