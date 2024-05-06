<script setup lang="ts">
const {registerUser} = useFirebaseAuth();
const form = reactive({
	email: "",
	password: ""
})

async function handleRegistration() {
	await registerUser(form.email, form.password);
}

</script>

<template>
	<form class="form authorization_form">
		<fieldset>
			<legend>Зарегистрироваться</legend>
			<input v-model="form.email" type="email" name="email" id="">
			<input v-model="form.password" type="password" name="password" id="">
			<button @click.prevent="handleRegistration">Зарегистрироваться</button>
		</fieldset>
	</form>
</template>

<style scoped lang="stylus">

</style>