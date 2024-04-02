<script setup lang="ts">
const { registerUser, signUser } = useFirebaseAuth();

const user = reactive({
	email: "",
	password: ""
})

async function handleRegistration() {
	console.log(user.email, user.password)
	await registerUser(user.email, user.password);
}

async function handleSignIn() {
	console.log(user.email, user.password)
	await signUser(user.email, user.password);
}
</script>

<template>
  <div>
	  <div class="login_form">
		  <form>
			  <fieldset>
				  <legend>Зарегистрироваться</legend>

				  <input v-model="user.email" type="email" name="email" id="">
			    <input v-model="user.password" type="password" name="password" id="">

				  <button @click.prevent="handleRegistration">Зарегистрироваться</button>
			  </fieldset>
		  </form>
	  </div>

	  <div class="authorization_form">
		  <fieldset>
			  <legend>Войти</legend>

		    <input v-model="user.email" type="email" name="email" id="">
		    <input v-model="user.password" type="password" name="password" id="">

			  <button @click.prevent="handleSignIn">Войти</button>
		  </fieldset>
	  </div>

<!--	  <NuxtWelcome />-->
  </div>
</template>

<style lang="stylus">
input
	border 1px solid coral
</style>