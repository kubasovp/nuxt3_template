<script setup lang="ts">
const { registerUser, signUser, getUserState, userSignOut } = useFirebaseAuth();

const form = reactive({
	email: "",
	password: ""
})

let userAcc = reactive({});
let isLogin = ref(false);

async function handleRegistration() {
	await registerUser(form.email, form.password);
}

async function handleSignIn() {
	userAcc = await signUser(form.email, form.password);
	isLogin.value = true;
}

async function who() {
	await getUserState();
}

async function exit() {
	userAcc = await userSignOut();
	isLogin.value = false;
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

	  <h2 v-if="isLogin">Вы вошли как {{ userAcc.user.email }}</h2>
	  <h2 v-else>Вы не вошли</h2>
  </div>
</template>

<style lang="stylus">
input
	border 1px solid coral
</style>