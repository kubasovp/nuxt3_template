<script setup lang="ts">
const { registerUser } = useFirebaseAuth();

const user = reactive({
	email: "",
	password: ""
})

async function handleRegistration() {
	console.log(user.email, user.password)
	await registerUser(user.email, user.password);
}
</script>

<template>
  <div>
	  <div class="login_form">
		  <form>
			  <fieldset>
				  <legend>Войти</legend>
			  </fieldset>

			  <input v-model="user.email" type="email" name="email" id="">
			  <input v-model="user.password" type="password" name="password" id="">

			  <button @click.prevent="handleRegistration">Войти</button>
		  </form>
	  </div>

	  <div class="authorization_form">
		  <fieldset>
			  <legend>Зарегистрироваться</legend>
		  </fieldset>
		  <input type="email" name="" id="">
		  <input type="password" name="" id="">
	  </div>

	  <NuxtWelcome />
  </div>
</template>

<style lang="stylus">
input
	border 1px solid coral
</style>