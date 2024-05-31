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
	getters: {
		isLogin: (state) => {
			return state.currentUser
		},
	},
	actions: {
		setUser(user: User) {
			this.currentUser = user
		},
		clearUser() {
			this.currentUser = null
		},
	},
})

// const currentUser: object = {}
//
// export const useUserStore = defineStore('user', {
// 	state: () => currentUser,
// 	getters: {
// 		isLogin: (state) => {
// 			return state.isLogin
// 		},
// 		email: (state) => {
// 			return state
// 		},
// 	},
// 	actions: {
// 		setUser(input: object) {
// 			this.$patch({ state: input })
// 		},
// 		clearUser() {
// 			this.$patch(currentUser)
// 		},
// 	},
// })
