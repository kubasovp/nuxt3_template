<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '~/stores/user.store'

interface currentUser {
	isLogin: boolean
	displayName: string | null
	email: string | null
	photoURL: string | null
	emailVerified: boolean
	uid: string | null
}

const userData: currentUser = {
	isLogin: false,
	displayName: '',
	email: '',
	photoURL: '',
	emailVerified: false,
	uid: '',
}

const userState = useUserStore()

onMounted(() => {
	const auth = getAuth()
	onAuthStateChanged(auth, (user) => {
		if (user) {
			userData.isLogin = true
			userData.displayName = user.displayName
			userData.email = user.email
			userData.photoURL = user.photoURL
			userData.emailVerified = user.emailVerified
			userData.uid = user.uid
			userState.setUser(userData)
		}
		else {
			console.log('User is signed out')
		}
	})
})
</script>

<template>
	<form class="form form_profile">
		<h2 v-if="userState.isLogin">
			Вы вошли как {{ userState.email }}
		</h2>
		<h2 v-else>
			Вы не вошли
		</h2>
		<fieldset>
			<legend>Профиль пользователя</legend>
			<ul>
				<li>displayName: <strong>{{ userState.displayName }}</strong></li>
				<li>email: <strong>{{ userState.email }}</strong></li>
				<li>photoURL: <strong>{{ userState.photoURL }}</strong></li>
				<li>emailVerified: <strong>{{ userState.emailVerified }}</strong></li>
				<li>uid: <strong>{{ userState.uid }}</strong></li>
			</ul>
		</fieldset>
	</form>
</template>

<style scoped lang="stylus">

</style>
