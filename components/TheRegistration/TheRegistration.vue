<script setup lang="ts">
import { getAuth, sendEmailVerification } from 'firebase/auth'

const { registerUser } = useFirebaseAuth()
const form = reactive({
	email: '',
	password: '',
})

async function handleRegistration() {
	await registerUser(form.email, form.password)

	// Отправляем письмо для подтверждения email
	const auth = getAuth()
	if (auth.currentUser) {
		sendEmailVerification(auth.currentUser)
			.then(() => {
				console.log('Email verification sent!')
			})
	}
}
</script>

<template>
	<form class="form authorization_form">
		<fieldset>
			<legend>Зарегистрироваться</legend>
			<input id="" v-model="form.email" type="email" name="email">
			<input id="" v-model="form.password" type="password" name="password">
			<button @click.prevent="handleRegistration">
				Зарегистрироваться
			</button>
		</fieldset>
	</form>
</template>

<style scoped lang="stylus">

</style>
