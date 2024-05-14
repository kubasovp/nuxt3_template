<script setup lang="ts">
const { registerUser } = useFirebaseAuth()
const form = reactive({
	email: '',
	password: '',
})

async function handleRegistration() {
	await registerUser(form.email, form.password)
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
