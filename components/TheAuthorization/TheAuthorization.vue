<script setup lang="ts">
import {useUserStore} from "~/stores/user.store";

const {signUser} = useFirebaseAuth();
const currentUser = useUserStore();

const form = reactive({
	email: "",
	password: ""
})

async function handleSignIn() {
	let userAcc = await signUser(form.email, form.password);
	console.log('userAcc', userAcc);
	currentUser.setUser(userAcc);
}
</script>

<template>
	<form class="form authorization_form">
		<fieldset>
			<legend>Войти</legend>
			<input v-model="form.email" type="email" name="email" id="">
			<input v-model="form.password" type="password" name="password" id="">
			<button @click.prevent="handleSignIn">Войти</button>
		</fieldset>
	</form>
</template>

<style scoped lang="stylus">

</style>