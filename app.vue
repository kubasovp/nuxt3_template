<script setup lang="ts">
const { registerUser, signUser, getUserState, userSignOut } = useFirebaseAuth();

const form = reactive({
	email: "",
	password: ""
})

let userAcc = reactive({});

async function handleSignIn() {
	userAcc = await signUser(form.email, form.password);
}

async function exit() {
	userAcc = await userSignOut();
}

async function handleRegistration() {
	await registerUser(form.email, form.password);
}

async function who() {
	await getUserState();
}
</script>

<template>
  <div>
	  <div class="login_form">
		  <form>
			  <fieldset>
				  <legend>Зарегистрироваться</legend>
				  <input v-model="form.email" type="email" name="email" id="">
			    <input v-model="form.password" type="password" name="password" id="">
				  <button @click.prevent="handleRegistration">Зарегистрироваться</button>
			  </fieldset>
		  </form>
	  </div>

	  <div class="authorization_form">
		  <fieldset>
			  <legend>Войти</legend>
			  <p>test@test.ru</p>
			  <p>123456</p>
		    <input v-model="form.email" type="email" name="email" id="">
		    <input v-model="form.password" type="password" name="password" id="">
			  <button @click.prevent="handleSignIn">Войти</button>
		  </fieldset>
	  </div>

	  <button @click.prevent="who">Who</button>
	  <button @click.prevent="exit">Выйти</button>

<!--	  <h2>Вы вошли как {{ userAcc.user.email }}</h2>-->
  </div>
</template>

<style lang="stylus">
input
	border 1px solid coral
</style>