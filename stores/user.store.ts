import { defineStore } from 'pinia';
import type { CurrentUser } from '@/types/types';

interface State {
	currentUser: CurrentUser | null;
}

export const useUserStore = defineStore('user', {
	state: (): State => ({
		currentUser: null,
	}),
	actions: {
		setUser(user: CurrentUser) {
			this.currentUser = user;
		},
		clearUser() {
			this.currentUser = null;
		},
	},
});
