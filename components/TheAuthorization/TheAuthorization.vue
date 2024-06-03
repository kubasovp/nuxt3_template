<script setup lang="ts">
import { useUserStore } from '~/stores/user.store'

const { signUser } = useFirebaseAuth()
const userStore = useUserStore()

const form = reactive({
	email: '',
	password: '',
})

async function handleSignIn() {
	const userData = await signUser(form.email, form.password)

	userStore.setUser({
		uid: userData.user.uid,
		displayName: userData.user.displayName || '',
		email: userData.user.email || '',
		photoURL: userData.user.photoURL || '',
		emailVerified: userData.user.emailVerified,
	})
}
</script>

<template>
	<form class="form authorization_form">
		<fieldset>
			<legend>Войти</legend>
			<input id="" v-model="form.email" type="email" name="email">
			<input id="" v-model="form.password" type="password" name="password">
			<button @click.prevent="handleSignIn">
				Войти
			</button>
		</fieldset>
	</form>
</template>

<style scoped lang="stylus">

</style>
